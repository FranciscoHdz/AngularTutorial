import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  checkOutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let isValid = this.validateForm(this.checkOutForm);
    if (isValid) {
      this.items = this.cartService.clearCart();
      console.warn('Your order has been submited !!', this.checkOutForm.value);
      window.alert('Your order has been submited !!');
      this.checkOutForm.reset();
    } else {
      window.alert(
        'To complete the purchase, you have to fill in all the data.'
      );
    }
  }

  validateForm(userData: FormGroup): boolean {
    if (userData.value.name === '' || userData.value.address === '') {
      return false;
    }
    return true;
  }
}
