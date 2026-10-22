import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: any[] = [];
  currentUserId: number | null = this.userService.getUserId();
  selectedList: any = null;
  items: any[] = [];
  newListName = '';
  newItemName = '';
  editingListId: number | null = null;
  editListName = '';
  editingItemId: number | null = null;
  editItemName = '';
  isDark = document.body.classList.contains('dark');
  inviteUsername = '';

  constructor(private api: ApiService, public auth: AuthService, private userService: UserService) {
    
  }

  ngOnInit() {
    this.loadLists();
  }

  // ── Theme ──────────────────────────────────────────────
  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    document.body.classList.toggle('light', !this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  // ── Lists ──────────────────────────────────────────────
  loadLists() {
    this.api.getLists().subscribe((res: any) => this.lists = res);
  }

  createList() {
    if (!this.newListName) return;
    this.api.createList(this.newListName).subscribe(() => {
      this.newListName = '';
      this.loadLists();
    });
  }

  deleteList(list: any) {
    if (!confirm(`Really delete "${list.name}" ?`)) return;
    this.api.deleteList(list.id).subscribe(() => {
      this.lists = this.lists.filter(l => l.id !== list.id);
        if (this.selectedList?.id === list.id) this.selectedList = null;
      });
  }

  selectList(list: any) {
    this.selectedList = list;
    this.loadItems();
  }

  startEdit(list: any) {
    this.editingListId = list.id;
    this.editListName = list.name;
  }

  saveEdit(list: any) {
    if (!this.editListName.trim()) return;
    this.api.updateList(list.id, this.editListName).subscribe(() => {
      list.name = this.editListName;
      this.editingListId = null;
      this.editListName = '';
    });
  }

  cancelEdit() {
    this.editingListId = null;
    this.editListName = '';
  }

  

  // ── Items ──────────────────────────────────────────────
  loadItems() {
    this.api.getItems().subscribe((res: any) => {
      const filtered = res.filter((i: any) => i.shopping_list === this.selectedList.id);
      this.items = this.sortItems(filtered);
    });
  }

  addItem() {
    if (!this.newItemName) return;
    this.api.createItem(this.newItemName, this.selectedList.id).subscribe(() => {
      this.newItemName = '';
      this.loadItems();
    });
  }

  startItemEdit(item: any) {
    this.editingItemId = item.id;
    this.editItemName = item.name;
  }

  saveItemEdit(item: any) {
    if (!this.editItemName.trim()) return;
    this.api.updateItem(item.id, this.editItemName).subscribe(() => {
      item.name = this.editItemName;
      this.editingItemId = null;
      this.editItemName = '';
    });
  }

  cancelItemEdit() {
    this.editingItemId = null;
    this.editItemName = '';
  }

  toggleItem(item: any) {
    this.api.toggleItem(item).subscribe(() => {
      item.completed = !item.completed;
      this.items = this.sortItems(this.items);
    });
  }

  deleteItem(id: number) {
    this.api.deleteItem(id).subscribe(() => this.loadItems());
  }
  

  logout() {
    this.auth.logout();
  }
  addUser(listId: number) {
    if (!this.inviteUsername) return;
    this.api.addUserToList(listId, this.inviteUsername).subscribe({
      next: () => {
        alert(`${this.inviteUsername} was added!`);
        this.inviteUsername = '';
      },
      error: () => alert('User not found')
    });
  }

  private sortItems(items: any[]): any[] {
    return [...items].sort((a: any, b: any) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }
}