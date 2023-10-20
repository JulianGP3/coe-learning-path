import { Component, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LearningPath } from 'src/app/models/learningPath.model';

@Component({
  selector: 'app-learning-path',
  templateUrl:'learning-path.component.html' ,
  styles: [
  ]
})
export class LearningPathComponent {
  @Input() learningPathData: LearningPath;
  id: number; // Define el tipo de datos adecuado para id
  title: string; // Define el tipo de datos adecuado para title
  updatedDescription: string; // Define el tipo de datos adecuado para updatedDescription
  updatedAcceptanceCriteria: string; // Define el tipo de datos adecuado para updatedAcceptanceCriteria
  isReadOnly: boolean; // Define el tipo de datos adecuado para isReadOnly
  public editor = ClassicEditor; // Asegúrate de importar ClassicEditor
  

  constructor() {
    // Inicializa tus propiedades según tus necesidades
    this.id = 0;
    this.title = '';
    this.updatedDescription = "<p>Hello, world!</p>";
    this.updatedAcceptanceCriteria = '';
    this.isReadOnly = true;
  }


  handleLocalSubmit() {
    // Maneja la lógica de envío del formulario aquí
  }

  handleInputChange() {
    // Maneja el cambio en el input del título aquí
  }

  handleDescriptionChange(event: any) {
    // Maneja el cambio en el campo de descripción del CKEditor aquí
    this.updatedDescription = event;
  }

  handleAcceptanceCriteriaChange(event: any) {
    // Maneja el cambio en el campo de criterios de aceptación del CKEditor aquí
    this.updatedAcceptanceCriteria = event;
  }
}
