import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VsComputerPage } from './vs-computer.page';

describe('VsComputerPage', () => {
  let component: VsComputerPage;
  let fixture: ComponentFixture<VsComputerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsComputerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VsComputerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
