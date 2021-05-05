import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bu_heavy_unload_limit, bu_tail_lift_pickup_limit } from 'src/app/constant/businessRules';
import { IDimension } from 'src/app/Models/IDimensionBU';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  show: boolean = true;
  dimensionLimit: IDimension = {
    _length: bu_heavy_unload_limit._length,
    _width: bu_heavy_unload_limit._width,
    _weight: bu_heavy_unload_limit._weight,
  };

  maxLength: number = 1;

  testForm = new FormGroup({
    _limit1: new FormControl(''),
    _weight: new FormControl(''),
    _length: new FormControl(''),
    _height: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.testForm.valueChanges.subscribe(checked => {


      if (this.testForm.value._limit1) {
        this.dimensionLimit = {
          _length: bu_tail_lift_pickup_limit._length,
          _width: bu_tail_lift_pickup_limit._width,
          _weight: bu_tail_lift_pickup_limit._weight,
        };
        this.maxLength = bu_tail_lift_pickup_limit._length;
      }

      else {
        this.dimensionLimit = {
          _length: bu_heavy_unload_limit._length,
          _width: bu_heavy_unload_limit._width,
          _weight: bu_heavy_unload_limit._weight,
        };
        this.maxLength = bu_heavy_unload_limit._length;
      }

      console.log(checked._weight);
      console.log(this.dimensionLimit._weight);
      this.show = false;

      if (checked._weight > this.dimensionLimit._weight) {
        this.show = true;
      }
      if (checked._length > this.dimensionLimit._length) {
        this.show = true;
      }
      if (checked._width > this.dimensionLimit._width) {
        this.show = true;
      }
    })
  }

  onSubmit() {
    console.log("Test Form Weight:" + this.testForm.value.Weight);
    if(this.show)
    {
      alert("Incorrect");
    }
  }
}
