from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import Backend.Functions as callMethod
import Backend.GlobalInfo.Helpers as HelperFunctions
from flask_mail import Mail, Message
import jwt
import datetime
from functools import wraps
from Backend.GlobalInfo.keys import JWT_SECRET_KEY  # Tu clave secreta
import os


# Crea la aplicación Flask
app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'static'))
CORS(app)

# Ruta para servir el frontend (Angular)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Ruta para servir otros archivos estáticos (CSS, JS, etc.)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'omar.rod.fraf@gmail.com'
app.config['MAIL_PASSWORD'] = 'svxf owxq meja eavy'
app.config['MAIL_DEFAULT_SENDER'] = 'omar.rod.fraf@gmail.com'
mail = Mail(app)


# ==========================
#  RUTAS
# ==========================

@app.route('/rutas', methods=['GET'])
def get_rutas():
    try:
        rutas = callMethod.get_all_rutas()
        return jsonify(rutas), 200
    except Exception as e:
        HelperFunctions.PrintException()
        return jsonify({'error': 'Error interno del servidor.'}), 500


# ==========================
#  LOGIN
# ==========================
# Función para verificar el token JWT
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        # Verificar si el token está presente en los headers de la solicitud
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # El token se pasa en el header

        if not token:
            return jsonify({'message': 'Token es requerido'}), 403  # Si no hay token, retorna un error 403

        try:
            # Decodificar el token usando la clave secreta
            decoded_token = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
            current_user_id = decoded_token['idUsuario']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token ha expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 401

        return f(current_user_id, *args, **kwargs)

    return decorated_function


# Ruta para verificar el código
@app.route('/verify', methods=['POST'])
@token_required  # Aplicamos la verificación del token
def verify_code(current_user_id):
    try:
        data = request.get_json()
        email = data.get('email')
        entered_code = data.get('code')

        # Llamar a la función de verificación de código desde Functions.py
        response, status_code = callMethod.verificar_codigo(email, entered_code)

        return jsonify(response), status_code

    except Exception as e:
        print(str(e))
        return jsonify({'message': 'Error al verificar el código'}), 500


# Ruta para login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email y contraseña son requeridos'}), 400

        # Verificar las credenciales del usuario
        user = callMethod.login_user(email, password)
        if user:
            # Generar JWT token
            token = callMethod.generate_jwt(user)
            rol = user.get('rol')
            return jsonify({"message": "Login exitoso", "user": user, "token": token, "rol": rol}), 200

        return jsonify({'error': 'Credenciales inválidas'}), 401
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor'}), 500



# ==========================
#  REGISTRO
# ==========================
@app.route('/registro', methods=['POST'])
def register():
    try:
        data = request.json
        print(data)
        nombre = data.get('nombre')
        apellidos = data.get('apellidos')
        email = data.get('email')
        password = data.get('password')
        rol = data.get('rol', 'user')

        if not nombre or not apellidos or not email or not password:
            return jsonify({'error': 'Faltan campos requeridos'}), 400

        result = callMethod.add_user(nombre, apellidos, email, password, rol)

        # Si es un dict, entonces contiene un error
        if isinstance(result, dict) and 'error' in result:
            return jsonify({'error': result['error']}), 400

        # Si todo salió bien, result es el id (int)
        return jsonify({"message": "Usuario registrado", "id": result}), 201

    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor'}), 500



# Ejecutar la API
if __name__ == '__main__':
    app.run(debug=True)