import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwoPlayerPage } from './two-player.page';

describe('TwoPlayerPage', () => {
  let component: TwoPlayerPage;
  let fixture: ComponentFixture<TwoPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwoPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
