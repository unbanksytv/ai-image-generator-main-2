import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IImage } from 'src/app/modals/image';
import { OpenaiService } from 'src/app/service/openai/openai.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor(
    private openaiService: OpenaiService
  ) { }

  ngOnInit(): void {
  }

  imageGeneratorForm: FormGroup = new FormGroup({
    prompt: new FormControl<string>("", [Validators.required, Validators.minLength(2)]),
    imageSize: new FormControl<string>("512x512", [Validators.required]),
  })

  resetForm(): void {
    this.imageGeneratorForm.reset({
      imageSize: "512x512",
      prompt: ""
    })
  }

  onSubmitClick(): void {
    console.log(this.imageGeneratorForm.controls);

    if (this.imageGeneratorForm.invalid) {
      this.imageGeneratorForm.markAllAsTouched()
      return
    }
   
    this.genearateImage()
  }

  aiImage: IImage | null = null
  isLoading: boolean = false

  genearateImage(): void {
    this.isLoading = true
    this.openaiService.generateImage(this.imageGeneratorForm.value).subscribe({
      next: (value: HttpResponse<IImage>) => {
        console.log(value);
        this.aiImage = value.body
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("completed");
        this.isLoading = false
      }
    })
  }
  
}
