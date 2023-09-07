declare type Mode = "edit" | "collect" | "export";

declare interface Message {
  input_type: string;
  title: string;
  value: string;
}

declare interface Tracker {
  component: typeof SvelteComponent;
}
