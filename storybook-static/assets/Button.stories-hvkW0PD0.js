import{r as v,j as f}from"./iframe-DeMr9wnz.js";import{c as S}from"./helpers-C8nBGPD0.js";import"./preload-helper-PPVm8Dsz.js";const i=v.forwardRef(({className:c,variant:l="primary",size:d="md",isLoading:o,isFullWidth:m,children:u,disabled:p,...g},h)=>{const b={primary:"btn-primary",secondary:"btn-secondary",accent:"btn-accent",ghost:"btn-ghost",outline:"btn-outline",link:"btn-link text-primary hover:text-primary-focus no-underline hover:underline",error:"btn-error",success:"btn-success",warning:"btn-warning",info:"btn-info"},y={xs:"btn-xs",sm:"btn-sm",md:"btn-md",lg:"btn-lg"};return f.jsx("button",{ref:h,disabled:p||o,className:S("btn transition-all duration-300 ease-in-out","hover:scale-[1.02] active:scale-[0.98]",b[l],y[d],m&&"w-full",o&&"loading",c),...g,children:!o&&u})});i.displayName="Button";const B={title:"Common/Button",component:i,tags:["autodocs"],args:{children:"Button"},argTypes:{variant:{control:"select",options:["primary","secondary","accent","ghost","outline","link","error","success","warning","info"]},size:{control:"select",options:["xs","sm","md","lg"]},isLoading:{control:"boolean"},isFullWidth:{control:"boolean"},disabled:{control:"boolean"}}},r={args:{variant:"primary",children:"Browse listings"}},e={args:{variant:"secondary",children:"Save for later"}},n={args:{variant:"outline",children:"Cancel"}},a={args:{variant:"ghost",children:"More"}},s={args:{isLoading:!0,children:"Submitting"}},t={args:{isFullWidth:!0,children:"Continue"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Browse listings'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Save for later'
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Cancel'
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'More'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: true,
    children: 'Submitting'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isFullWidth: true,
    children: 'Continue'
  }
}`,...t.parameters?.docs?.source}}};const F=["Primary","Secondary","Outline","Ghost","Loading","FullWidth"];export{t as FullWidth,a as Ghost,s as Loading,n as Outline,r as Primary,e as Secondary,F as __namedExportsOrder,B as default};
