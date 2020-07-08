import {Component, ViewChild, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
import {NgForm, FormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {EToken, Point, SimplePoint} from '../shared/services/interfaces';
import {CheckService} from "../shared/services/check.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-laba',
  templateUrl: './laba-page.component.html',
  styleUrls: ['./laba-page.component.css']
})
export class LabaPageComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef;
  form: FormGroup;
  point: Point = new Point();
  etoken: EToken = new EToken();
  arr: string;
  arrPoints: SimplePoint[];
  AVAILABLE_X: number[] = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  AVAILABLE_R: number[] = [-1.99, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 1.99];
  constructor(private fb: FormBuilder,
              private check: CheckService,
              private auth: AuthService){ }

  ngOnInit(): void {
    this.initForm();
    this.drawPicture();
    this.drawGraphWithR(1);
    this.makeTTable();
  }
  initForm(){
   this.form = this.fb.group({
     x: [null, [Validators.required, Validators.min(-3), Validators.max(3)]],
     y: [null, [Validators.required, Validators.min(-3), Validators.max(3), Validators.pattern(/[0-9]/)]],
     r: [1, [Validators.required]],
     test: [null]
   });
  }
  addPointsFromForm() {
    const controls = this.form.controls;
    this.point.x = this.form.value.x;
    this.point.y = this.form.value.y;
    this.point.r = this.form.value.r;
    this.paintArc(this.point.x, this.point.y);
    this.point.token = this.auth.getToken();
    this.point.login = this.auth.getLogin();
    this.check.check(this.point).subscribe(
      data => this.parseData(data),
      error => console.log(error));
    console.log(this.form.value);
    this.drawPoints();
    this.makeTTable();
  }
  play(audio){
    audio = document.getElementById(audio);
  }
  drawPicture(){
    const canvas = document.getElementById('graph') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 140);
    ctx.lineTo(280, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(140, 280);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(136, 5);
    ctx.moveTo(140, 0);
    ctx.lineTo(144, 5);
    ctx.stroke();
    ctx.moveTo(280, 140);
    ctx.lineTo(275, 136);
    ctx.moveTo(280, 140);
    ctx.lineTo(275, 144);
    ctx.stroke();
    for (let i = 28; i <= 252; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 140);
      ctx.lineTo(i, 144);
      ctx.lineTo(i, 136);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(140, i);
      ctx.lineTo(144, i);
      ctx.lineTo(136, i);
      ctx.stroke();
    }
    let countI = -4;
    for (let i = 28; i <= 252; i += 28) {
      if (i <= 112) {
        ctx.fillText(countI / 2 + 'R', i - 8, 155);
        ctx.fillText(-countI / 2 + 'R', 148, i + 4);
        countI++;
      } else if (i === 140) {
        ctx.fillText(String(countI), i + 5, 155);
        countI++;
      } else {
        ctx.fillText(countI / 2 + 'R', i - 8, 155);
        ctx.fillText(-countI / 2 + 'R', 148, i + 4);
        countI++;
      }
    }
  }
  drawGraphWithR(r) {
    r = Math.abs(r);
    console.log(r);
    if (this.validateR(r)) {
      const canvas = document.getElementById('graph') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      r = Number(r) * 28;
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(140, 140);
      ctx.rect(140, 140, 2 * r, r);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(140, 140);
      ctx.arc(140, 140, r, Math.PI, Math.PI / 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.lineTo(140 - r, 140);
      ctx.lineTo(140, 110 - r);
      ctx.lineTo(140, 140);
      ctx.fill();
      this.drawPicture();
      this.drawPoints();
    }
  }
  makeTTable(){
    this.etoken.email = this.auth.getLogin();
    this.etoken.token = this.auth.getToken();
    this.check.getPoints(this.etoken).subscribe(
      data => this.parseData(data),
      error => console.log(error)
    );
  }
  checkClick($event): any {
    console.log($event.offsetX + 'first' + $event.offsetY);
    this.point.x = ($event.offsetX - 140) / 56;
    this.point.y = -($event.offsetY - 140) / 56;
    this.point.r = this.form.value.r;
    this.point.token = this.auth.getToken();
    this.point.login = this.auth.getLogin();
    this.paintArc(this.point.x, this.point.y);
    console.log('x = ' + this.point.x + '; y = ' +  this.point.y + '; r = ' +  this.point.r);
    this.check.check(this.point).subscribe(
      data => this.parseData(data),
        error => console.log(error));
    this.drawPoints();
    this.makeTTable();
  }
  validateString(x: number): boolean{
    if (!/^(-?\d+)([.,]\d+)?$/.test((String(x)))){
      return false;
    }
    if (x === undefined){
      return false;
    }else{
      return true;
    }

  }
  validateR(r: number): boolean{
    if (this.validateString(r)){
      if (r < 2 && r > -2){
        return true;
      }else{
        document.getElementById('hidR').hidden = false;
        return false;
      }
    }else{
      document.getElementById('hidR').hidden = false;
    }
  }
  drawPoints(){
    const canvas = document.getElementById('graph') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (this.arr === undefined){
      return;
    }
    const rows = this.arr.length;
    console.log('Points : ' + rows);
    for (let i = 0; i < rows; i++){
      const Arrpoint: SimplePoint = JSON.parse(JSON.stringify(this.arr[i])) as SimplePoint;
      if (Arrpoint.result === 'N'){
        Arrpoint.isArea = false;
      } else if (Arrpoint.result === 'Y'){
        Arrpoint.isArea = true;
      }
      if (Arrpoint.r == this.form.value.r){
        if (Arrpoint.isArea === true){
          ctx.fillStyle = 'blue';
        }else{
          ctx.fillStyle = 'red';
        }
      }else{
        ctx.fillStyle = 'grey';
      }
      this.paintArc(Arrpoint.x, Arrpoint.y);
    }
  }
  paintArc(x, y) {
    x = x * 56 + 140;
    y = -y * 56 + 140;
    // console.log(x + 'second' + y);
    const canvas = document.getElementById('graph') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  parseData(data: string){
    this.arr = data;
    this.arrPoints = [];
    for (let i = 0; i < this.arr.length; i++){
      const Arrpoint: SimplePoint = JSON.parse(JSON.stringify(this.arr[i])) as SimplePoint;
      if (Arrpoint.result === 'N'){
        Arrpoint.isArea = false;
      } else if (Arrpoint.result === 'Y'){
        Arrpoint.isArea = true;
      }
      this.arrPoints.push(Arrpoint);
    }
    this.drawPoints();
  }
}
