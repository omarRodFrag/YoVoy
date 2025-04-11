import os
import mysql.connector

# Tu clave secreta generada
JWT_SECRET_KEY = "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p" 

# Configuración de la conexión a MySQL
DB_CONFIG = {
    "host": "localhost",  # Cambia según tu configuración
    "user": "root",       # Usuario de la base de datos
    "password": "",       # Contraseña de la base de datos
    "database": "yovoy"  # Nombre de tu base de datos
}

# Función para obtener conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)
#Creado Por Omar Rodriguez Fragroso, Pablo Daniel Macias Espino, Bryan Armando Caudel Hernandez, Rodrigo Villalpando Jimenez, Luis Pablo Samano Aguilar