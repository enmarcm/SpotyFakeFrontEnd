import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonButtons, IonSearchbar, IonContent, IonList, IonCheckbox, IonItem, IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-typehead',
  standalone: true,
  imports: [IonImg, IonItem, IonCheckbox, IonList, IonContent, IonSearchbar, IonButtons, IonTitle, IonButton, IonToolbar, IonHeader, ],
  templateUrl: './typehead.component.html',
})
export class TypeaheadComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';
  @Input() searchSongs!: (name: string) => Promise<any>;

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() updatedItems = new EventEmitter<any[]>();

  filteredItems: any[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  trackItems(index: number, item: any) {
    return item.id || item._id; // Use id or _id for tracking
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  async searchbarInput(ev: any) {
    const newItems = await this.searchSongs(ev.target.value);
  
    console.log(newItems)
    console.log(newItems && Array.isArray(newItems))

    if (newItems && Array.isArray(newItems)) {
      this.items = newItems; 
      this.filterList(ev.target.value); 
    } else {
      console.error('La búsqueda no devolvió un array válido');
    }
  }

  filterList(searchQuery: string | undefined) {
  if (!Array.isArray(this.items)) {
    console.warn('this.items is not an array. Initializing to empty array.');
    this.items = [];
  }

  if (searchQuery === undefined) {
    this.filteredItems = [...this.items];
  } else {
    const normalizedQuery = searchQuery.toLowerCase();
    this.filteredItems = this.items
      .map((item) => {
        // Calcula un puntaje de relevancia; aquí usamos coincidencia de subcadenas como ejemplo
        const itemNameLower = item.name.toLowerCase();
        const score = itemNameLower.includes(normalizedQuery) ? itemNameLower.indexOf(normalizedQuery) : itemNameLower.length;
        return { item, score };
      })
      .sort((a, b) => a.score - b.score) // Ordena por puntaje de relevancia
      .map((obj) => obj.item); // Extrae los elementos originales
  }
}

  isChecked(id: string) {
    return this.workingSelectedValues.includes(id);
  }

  checkboxChange(ev: any, item: any) {
    const { checked } = ev.detail;
    const itemId = item.id || item._id; // Use id or _id

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, itemId];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter(
        (value) => value !== itemId
      );
    }
  }
}