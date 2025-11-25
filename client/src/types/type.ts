export type FormData = {
  name: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
};

export type Props = {
  formData: FormData;
  setFormData: any;
  handleChange: any;
  handleSubmit: any;
};

export type Task = {
  _id: string;
  name: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LogInForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type MobileNavProps = {
  navigation: { name: string; href: string }[];
};
