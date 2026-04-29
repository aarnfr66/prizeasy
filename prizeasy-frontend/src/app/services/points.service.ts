import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PointsRequest, PointsHistory } from '../models/points.model';

@Injectable({ providedIn: 'root' })
export class PointsService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/points';

  getMyHistory() {
    return this.http.get<PointsHistory[]>(`${this.API}/my-points`);
  }

  getAllHistory() {
    return this.http.get<PointsHistory[]>(this.API);
  }

  addPoints(data: PointsRequest) {
    return this.http.post(`${this.API}/add`, data);
  }

  deductPoints(data: PointsRequest) {
    return this.http.post(`${this.API}/deduct`, data);
  }
}
