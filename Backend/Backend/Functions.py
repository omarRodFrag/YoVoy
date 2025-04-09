import bcrypt
import random
import jwt
import datetime
from flask_mail import Message, Mail
from Backend.GlobalInfo.keys import get_db_connection, JWT_SECRET_KEY
mail = Mail()

# Obtener todos los usuarios
def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    users = cursor.fetchall()
    conn.close()
    return users

# Obtener un usuario por ID
def get_user_by_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    conn.close()
    return user



# Actualizar un usuario
def update_user(user_id, name, email, role):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "UPDATE usuarios SET nombre = %s, email = %s, rol = %s WHERE id = %s"
    cursor.execute(sql, (name, email, role, user_id))
    conn.commit()
    conn.close()
    return cursor.rowcount  # Retorna la cantidad de filas afectadas

# Eliminar un usuario
def delete_user(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM usuarios WHERE id = %s"
    cursor.execute(sql, (user_id,))
    conn.commit()
    conn.close()
    return cursor.rowcount  # Retorna la cantidad de filas eliminadas





# ==========================
#  UNIDADES
# ==========================

def get_all_unidades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM unidades")
    unidades = cursor.fetchall()
    conn.close()
    return unidades

def add_unidad(nombre, numero_economico, latitud, longitud, ruta_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO unidades (nombre, numero_economico, latitud, longitud, ruta_id) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (nombre, numero_economico, latitud, longitud, ruta_id))
    conn.commit()
    unidad_id = cursor.lastrowid
    conn.close()
    return unidad_id

# ==========================
#  RUTAS
# ==========================

def get_all_rutas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rutas")
    rutas = cursor.fetchall()
    conn.close()
    return rutas

def add_ruta(nombre, descripcion):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO rutas (nombre, descripcion) VALUES (%s, %s)"
    cursor.execute(sql, (nombre, descripcion))
    conn.commit()
    ruta_id = cursor.lastrowid
    conn.close()
    return ruta_id

# ==========================
#  PARADAS
# ==========================

def get_all_paradas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM paradas")
    paradas = cursor.fetchall()
    conn.close()
    return paradas

def add_parada(nombre, latitud, longitud):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO paradas (nombre, latitud, longitud) VALUES (%s, %s, %s)"
    cursor.execute(sql, (nombre, latitud, longitud))
    conn.commit()
    parada_id = cursor.lastrowid
    conn.close()
    return parada_id



# ==========================
#  REGISTRO
# ==========================

# Crear un nuevo usuario
def add_user(name, apellidos, email, password, role):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Verifica si el correo ya está registrado
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        return {'error': 'El correo ya está registrado.'}

    # Hashear la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    sql = "INSERT INTO usuarios (nombre, apellidos, email, password, rol) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (name,apellidos,  email, hashed_password, role))
    conn.commit()  # Guardamos los cambios
    user_id = cursor.lastrowid  # Obtenemos el ID del usuario creado
    conn.close()
    return user_id


# Función para generar un JWT token
def generate_jwt(user):
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expira en 1 hora
    payload = {
        'idUsuario': user['idUsuario'],
        'exp': expiration_time  # Fecha de expiración del token
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')  # Firmamos el token con la clave secreta
    return token


def login_user(email, password):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT * FROM usuarios WHERE email = %s" 
    cursor.execute(sql, (email,))
    user = cursor.fetchone()

    # Generar un código de verificación aleatorio
    verification_code = random.randint(100000, 999999)

    # Almacenar el código de verificación en la base de datos
    cursor.execute("UPDATE usuarios SET verification_code = %s WHERE email = %s", (verification_code, email))
    conn.commit()

    # Enviar el código por correo
    email_sent = send_verification_email(email, verification_code)

    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return user
    return None

# Función para enviar el correo de verificación
def send_verification_email(email, code):
    try:
        msg = Message('Código de Verificación', recipients=[email])
        msg.body = f'Tu código de verificación es: {code}'
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error al enviar correo: {e}")
        return False


# Función para verificar el código de verificación de un usuario
def verificar_codigo(email, entered_code):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT verification_code FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()

        conn.close()

        if user:
            stored_code = user.get('verification_code')

            # Compara el código ingresado con el almacenado
            if str(entered_code) == str(stored_code):
                return {'message': 'Código verificado correctamente'}, 200
            else:
                return {'message': 'Código incorrecto'}, 400
        else:
            return {'message': 'Usuario no encontrado'}, 404

    except Exception as e:
        print(str(e))
        return {'message': 'Error al verificar el código'}, 500