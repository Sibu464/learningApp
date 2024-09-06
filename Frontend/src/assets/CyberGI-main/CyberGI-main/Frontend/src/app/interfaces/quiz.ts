////////////////////////////////////////////////////////////
export interface Question {
  id: number;
  text: string;
  options: Option[];
  feedback: string; 
}

export interface Option {
  id: number; // Unique identifier for the option
  optionText: string; // The text of the option
  correct: boolean; // Indicates if this option is the correct answer
}

export interface CorrectAnswer {
  id: number;
  optionId: number;
}

export interface Feedback {
  id: number;
  feedbackText: string;
}

export interface UserAnswer {
  id?: number; // Optional if auto-generated
  userId: number; // ID of the user
  questionId: number; // ID of the question
  optionId: number; // ID of the selected option
  moduleId: number; // ID of the module
  correct: boolean; // Indicates if the answer was correct
}
export interface Progress {
  id: number;
  user: User;
  module: module;
  currentQuestionIndex: number;
}
//////////////////////////////////////////////////////////

  export interface module{
    id: number;
    name:string;
    description:string;
    picture:string;
  }
  export interface Employer {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: { id: number; name: string }[];
}


export interface Subscription {
    id: number;
    module: module;
    employer: Employer;
}

export interface employer {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
  
export interface User {
  id: number; // Unique identifier for the user
  username: string; // Username chosen by the user
  email: string; // User's email address
  password: string; 
}
export interface feedback{
  feedbackText:string;
}