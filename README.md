# osb-addon-example

## Install

Ensure you have the core extension addon installed
```
npm run osb addon add https://github.com/Michael-Gibbons/osb-addon-extension-manager
```

```
npm run osb addon add https://github.com/Michael-Gibbons/osb-addon-theme-extension-base
```

## Objective

This addon provides the source code and build process to compile a React + Vite application into shopify theme extension code.

Simply install the addons and run `npm run dev`. The build and dev process will be injected into the top level dev and build commands.

## Limitations

- Shopify imposes 1 theme extension per application.
- Max bundle size 10mb
- Warning when js goes over 10kb, (right out of the box it is around 14kb), though shopify does not impose this 10kb limitation.
