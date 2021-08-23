import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vg-error-section',
  templateUrl: './vg-error-section.component.html',
  styleUrls: ['./vg-error-section.component.scss'],
})
export class VgErrorSectionComponent implements OnInit {
  @Input() label = 'Label';
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  @Input() control!: AbstractControl | null;

  ngOnInit(): void {
    if (!this.control) {
      this.control = this.group.get(this.controlName);
    }
  }
}
