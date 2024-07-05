import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaPreviewComponent } from './idea-preview.component';

describe('IdeaPreviewComponent', () => {
  let component: IdeaPreviewComponent;
  let fixture: ComponentFixture<IdeaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
