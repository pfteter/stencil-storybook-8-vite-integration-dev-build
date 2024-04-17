export default {
  // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
  title: 'Components/MyComponent',
};

const Template = args => `<my-component first="${args.first}" middle="${args.middle}" last="${args.last}"></my-component>`;

export const Example = Template.bind({});
Example.args = {
  first: 'Winnie 3',
  middle: 'The',
  last: 'Pooh',
};
