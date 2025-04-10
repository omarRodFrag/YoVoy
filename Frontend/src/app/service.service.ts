// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:5000'; // URL base de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las rutas
  getRutas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/rutas`);
  }

  // Crear un nuevo usuario
  registrarUsuario(data: any): Observable<any> {
    console.log(data)
    return this.http.post(`${this.baseUrl}/registro`, data);
  }

  // Login con JWT
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // Verificar el código de verificación
  verifyCode(body: { email: string, code: string }, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify`, body, { headers });
  }

}
