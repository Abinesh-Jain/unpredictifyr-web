import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-picker.component.html',
  styleUrl: './file-picker.component.scss'
})
export class FilePickerComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  downloadLink: string | null = null;
  images: any[] = [];

  @Input() multiple: boolean = false;

  @ViewChild('file') file!: ElementRef<HTMLInputElement>;

  @Output() change: EventEmitter<File | null> = new EventEmitter<File | null>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      // Show image preview if the selected file is an image
      if (this.selectedFile.type.startsWith('image')) {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = (e) => {
          this.imagePreview = reader.result;
          image.src = e.target?.result as string;
          this.images.push(image.src);
        };
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          console.log(`Image Dimensions: ${width}x${height}`);
          this.createCanvas(image);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.imagePreview = null; // Clear the preview if it's not an image
      }
    }
    this.change.emit(this.selectedFile);
  }

  onDrop(event: DragEvent) {
    // Prevent default behavior
    event.preventDefault();

    // Handle drop logic here
    console.log(event);
  }

  onDragStart(event: DragEvent) {
    // Optionally, you can set data to be transferred here
    event.dataTransfer?.setData('text/plain', 'Dragging image');
  }

  onDragOver(event: DragEvent) {
    // Prevent default behavior to allow dropping
    event.preventDefault();
  }

  clear() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.file.nativeElement.value = '';
    this.change.emit(null);
  }

  createCanvas(image: HTMLImageElement, width = 900, height = 300) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    if (ctx) {
      ctx.drawImage(image, 0, 0, width, height);
      const resizedImage = canvas.toDataURL('image/jpeg');
      this.imagePreview = resizedImage;
      this.downloadLink = resizedImage;
    }

  }
}
