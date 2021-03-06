import { Component, OnInit, Input } from '@angular/core';
import {ICONS} from "../../../../../app.constants";

@Component({
  selector: 'sm-neon-button',
  templateUrl: './neon-button.component.html',
  styleUrls: ['./neon-button.component.scss']
})
export class NeonButtonComponent implements OnInit {
  @Input() label = 'CREATE NEW';
  @Input() disabled = false;
  @Input() iconClass;

  constructor() { }

  ngOnInit() {
  }

}
