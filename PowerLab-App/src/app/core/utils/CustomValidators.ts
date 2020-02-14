import { FormControl } from '@angular/forms'

export default class CustomValidators {
  
  static noSpaceAfterComma(formControl: FormControl) {
    const value = formControl.value

    if (value.indexOf(', ') > -1) {
      return {
        spaceAfterComma: true
      }
    }

    return null
  }

  static noCommaAtTheEnd(formControl: FormControl) {
    const value = formControl.value

    if (value.endsWith(',')) {
      return {
        commaAtTheEnd: true
      }
    }

    return null
  }
}