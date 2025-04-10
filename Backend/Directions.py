from flask import Flask, jsonify, request
from flask_cors import CORS
import Backend.Functions as callMethod
import Backend.GlobalInfo.Helpers as HelperFunctions
from flask_mail import Mail, Message
import jwt
import datetime
from functools import wraps
from Backend.GlobalInfo.keys import JWT_SECRET_KEY  # Tu clave secreta


app = Flask(__name__)
CORS(app)


# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'omar.rod.fraf@gmail.com'
app.config['MAIL_PASSWORD'] = 'svxf owxq meja eavy'
app.config['MAIL_DEFAULT_SENDER'] = 'omar.rod.fraf@gmail.com'
mail = Mail(app)


# Ruta para obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = callMethod.get_all_users()
        return jsonify(users), 200
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor.'}), 500  # Mensaje de error más claro

# Ruta para obtener un usuario por ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = callMethod.get_user_by_id(user_id)
        if user:
            return jsonify(user), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor.'}), 500  # Mensaje de error más claro

# Ruta para crear un usuario
@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        nombre = data.get('nombre')
        email = data.get('email')
        contraseña = data.get('contraseña')
        rol = data.get('rol')
        user_id = callMethod.add_user(nombre, email, contraseña, rol)
        return jsonify({"message": "User created", "id": user_id}), 201
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor.'}), 500  # Mensaje de error más claro

# Ruta para actualizar un usuario
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.json
        nombre = data.get('nombre')
        email = data.get('email')
        rol = data.get('rol')
        affected_rows = callMethod.update_user(user_id, nombre, email, rol)
        if affected_rows > 0:
            return jsonify({"message": "User updated"}), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor.'}), 500  # Mensaje de error más claro

# Ruta para eliminar un usuario
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        affected_rows = callMethod.delete_user(user_id)
        if affected_rows > 0:
            return jsonify({"message": "User deleted"}), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        HelperFunctions.PrintException()
        print(str(e))
        return jsonify({'error': 'Error interno del servidor.'}), 500  # Mensaje de error más claro







@app.route('/unidades', methods=['GET'])
def get_unidades():
    try:
        unidades = callMethod.get_all_unidades()
        return jsonify(unidades), 200
    except Exception as e:
        HelperFunctions.PrintException()
        return jsonify({'error': 'Error interno del servidor.'}), 500

@app.route('/unidades', methods=['POST'])
def create_unidad():
    try:
        data = request.json
        nombre = data.get('nombre')
        numero_economico = data.get('numero_economico')
        latitud = data.get('latitud')
        longitud = data.get('longitud')
        ruta_id = data.get('ruta_id')
        unidad_id = callMethod.add_unidad(
            nombre, numero_economico, latitud, longitud, ruta_id
        )
        return jsonify({"message": "Unidad creada", "id": unidad_id}), 201
    except Exception as e:
        HelperFunctions.PrintException()
        return jsonify({'error': 'Error interno del servidor.'}), 500

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

@app.route('/rutas', methods=['POST'])
def create_ruta():
    try:
        data = request.json
        nombre = data.get('nombre')
        descripcion = data.get('descripcion')
        ruta_id = callMethod.add_ruta(nombre, descripcion)
        return jsonify({"message": "Ruta creada", "id": ruta_id}), 201
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