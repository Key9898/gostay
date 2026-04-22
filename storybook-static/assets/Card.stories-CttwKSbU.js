import{j as e}from"./iframe-DeMr9wnz.js";import{c as n}from"./helpers-C8nBGPD0.js";import{S as s}from"./Skeleton-B0okb418.js";import"./preload-helper-PPVm8Dsz.js";function g({children:x,className:c,image:i,title:o,isLoading:u,onClick:m,footer:l,badgeContent:d,badgeVariant:p="secondary"}){return u?e.jsxs("div",{className:n("warm-card overflow-hidden",c),children:[e.jsx(s,{className:"h-44 w-full rounded-none sm:h-56"}),e.jsxs("div",{className:"p-5 space-y-3",children:[e.jsx(s,{className:"h-5 w-3/4"}),e.jsx(s,{className:"h-4 w-full"}),e.jsx(s,{className:"h-4 w-5/6"}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx(s,{className:"h-8 w-24"}),e.jsx(s,{className:"h-8 w-20"})]})]})]}):e.jsxs("div",{onClick:m,className:n("warm-card group overflow-hidden",m&&"cursor-pointer",c),children:[i&&e.jsxs("figure",{className:"relative h-44 overflow-hidden bg-base-200 sm:h-56",children:[e.jsx("img",{src:i,alt:o||"Card image",className:"h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"}),d&&e.jsx("div",{className:n("absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",p==="primary"?"bg-primary/95 text-primary-content":p==="accent"?"bg-accent/95 text-accent-content":"bg-base-100/90 text-base-content ring-1 ring-base-300"),children:d})]}),e.jsxs("div",{className:"p-5",children:[o&&e.jsx("h3",{className:"font-serif text-lg font-semibold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-xl",children:o}),x,l&&e.jsx("div",{className:"mt-5 flex items-center justify-between border-t border-base-300/70 pt-4",children:l})]})]})}const w={title:"Common/Card",component:g,tags:["autodocs"],parameters:{layout:"centered"}},h="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",a={args:{image:h,title:"Bamboo Loft on 38th Street",children:e.jsx("p",{className:"mt-2 text-sm text-base-content/65",children:"A warm loft in downtown Yangon."}),footer:e.jsx("span",{className:"display text-primary",children:"480,000 Ks"}),badgeContent:"Featured",badgeVariant:"primary"}},t={args:{isLoading:!0}},r={args:{title:"No image card",children:e.jsx("p",{className:"mt-2 text-sm text-base-content/65",children:"Simple content-only card."})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    image: SAMPLE_IMG,
    title: 'Bamboo Loft on 38th Street',
    children: <p className="mt-2 text-sm text-base-content/65">A warm loft in downtown Yangon.</p>,
    footer: <span className="display text-primary">480,000 Ks</span>,
    badgeContent: 'Featured',
    badgeVariant: 'primary'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isLoading: true
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No image card',
    children: <p className="mt-2 text-sm text-base-content/65">Simple content-only card.</p>
  }
}`,...r.parameters?.docs?.source}}};const y=["Default","Loading","Plain"];export{a as Default,t as Loading,r as Plain,y as __namedExportsOrder,w as default};
