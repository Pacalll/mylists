import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/token/`, { username, password });
  }

  getLists() {
    return this.http.get(`${this.baseUrl}/lists/`);
  }

  createList(name: string) {
    return this.http.post(`${this.baseUrl}/lists/`, { name });
  }

  getItems() {
    return this.http.get(`${this.baseUrl}/items/`);
  }

  deleteList(id: number) {
    return this.http.delete(`${this.baseUrl}/lists/${id}/`);
  }

  createItem(name: string, listId: number) {
    return this.http.post(`${this.baseUrl}/items/`, { name, shopping_list: listId });
  }

  toggleItem(item: any) {
    return this.http.patch(`${this.baseUrl}/items/${item.id}/`, { completed: !item.completed });
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/items/${id}/`);
  }
  updateList(listId: number, name: string) {
    return this.http.patch(`${this.baseUrl}/lists/${listId}/`, { name });
  }
  updateItem(itemId: number, name: string) {
    return this.http.patch(`${this.baseUrl}/items/${itemId}/`, { name });
  }
  addUserToList(listId: number, username: string) {
    return this.http.post(`${this.baseUrl}/lists/${listId}/add_user/`, { username });
  }

}
