import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'REACTIVEFORM';
  reactiveForm:FormGroup;
  formStatus;

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null,[ Validators.required,this.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required,this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email],this.emailNotAllowed),
      }),
      
      gender:new FormControl('male'),
      country:new FormControl('india'),
      hobbies:new FormControl(null),
      skills:new FormArray([
        new FormControl(null,Validators.required)
       
       
        
      ])

    });
 

    //  Value changes when ever enter the value for firstname
    // this.reactiveForm.valueChanges.subscribe((value)=>
    // {
    //   console.log(value);
    // })
    this.reactiveForm.statusChanges.subscribe((value)=>
    {
      console.log(value);
      this.formStatus=value;
    })

    // this.reactiveForm.setValue({
    //   personalDetails:{
    //     firstname:'',
    //     lastname:'',
    //     email:'abc@gmail.com'
    //   },
    //   gender:'',
    //   country:'',
    //   hobbies:'',
    //   skills:[]
    // })
    setTimeout(() => {
      this.reactiveForm.patchValue({
        personalDetails:{
          email:'abc@example.com'
        }
      })
    }, 2000);
  }
  onSubmit()
  {
    console.log(this.reactiveForm);

    //  This for reseting the values 
    this.reactiveForm.reset({
     personalDetails:{
      firstname:'',
      lastname:'',
      email:''
     },
     gender:'male',
     country:'india',
     hobbies:'',
     skills:[]
    });
  }

  // Dynamically adding the skills with form controls//

  addSkills()
  {
(<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required))
  }


  //custom validator nospace,that no space allowed for firstname and lastname//

  noSpaceAllowed(control:FormControl)
  {
    if(control.value!=null && control.value.indexOf(' ')!=-1)
    {
      return{npSpaceAllowed:true}
     
    }
    return null;
  }

  // Specicfic Email Not allowed custome email Validtor//

 emailNotAllowed(control:FormControl):Promise<any>
 {
const response=new Promise((resolve,reject)=>
{
setTimeout(() => {
  if(control.value=== 'procademy@gmail.com')
  {
    resolve({emailNotAllowed:true})
  }else{
    resolve (null)
  }
}, 1000);
});
return response;
 }
}
