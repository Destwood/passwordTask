import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  password: string = '';
  checkPassword: boolean = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef;

  @ViewChild('firstSection') firstSection!: ElementRef;
  @ViewChild('secondtSection') secondtSection!: ElementRef;
  @ViewChild( 'thirdSection' ) thirdSection!: ElementRef;
  

  startHold() {
    this.checkPassword = true;
    this.passwordInput.nativeElement.type = 'text';
  }

  stopHold() {
    this.checkPassword = false;
    this.passwordInput.nativeElement.type = 'password';
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedChars = /[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\-=/\\]/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }

    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  onInputChange() {
    if (this.password.includes(' ')) {
      console.log("return")
      return;
    }
    if (this.password.length === 0) {
      this.setSectionColors('grey', 'grey', 'grey');
      return;
    }
    if(this.password.length < 8) {
      this.setSectionColors('red', 'red', 'red');
      return;
    }

    let strength = this.calculatePasswordStrength(this.password);
    switch (strength) {
      case 'easy':
        this.setSectionColors('red', 'grey', 'grey');
        break;
      case 'medium':
        this.setSectionColors('yellow', 'yellow', 'grey');
        break;
      case 'strong':
        this.setSectionColors('green', 'green', 'green');
        break;
      default:
        break;
    }
  }

  private setSectionColors(firstColor: string, secondColor: string, thirdColor: string) {
    this.setSectionColor(this.firstSection, firstColor);
    this.setSectionColor(this.secondtSection, secondColor);
    this.setSectionColor(this.thirdSection, thirdColor);
  }

  private setSectionColor(section: ElementRef, color: string) {
    section.nativeElement.style.backgroundColor = color;
  }

  private calculatePasswordStrength(password: string): string {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\-=/\\]/.test(password);

    if (hasLetters && hasNumbers && hasSymbols) {
      return 'strong';
    } else if (hasLetters && (hasSymbols || hasNumbers) || hasSymbols && hasNumbers) {
      return 'medium';
    } else {
      return 'easy';
    }
  }
}
