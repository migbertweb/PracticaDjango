# GUIA PARA INSTALAR WEBPACK EN DJANGO
## E INSTALAR TAILWIND CSS Y CUALQUIER OTRO COMPONENTE JAVASCRIPT

* inicializar npm en el proyecto

        npm init -y
* instalar webpack y sus componentes

        npm install webpack
        npm install webpack-cli webpack-dev-server --save-dev
* instalar los Componentes y loader necesarios

        npm install babel-loader @babel/core @babel/preset-env style-loader css-loader postcss-loader postcss-preset-env --save-dev

        npm install css-loader postcss-loader postcss mini-css-extract-plugin @fullhuman/postcss-purgecss --save-dev    

* instalar Tailwind CSS, PostCSS
        
        npm install tailwindcss postcss-cli postcss --save-dev
* cree los archivos de configuracion de webpack y postcss

        touch webpack.config.js postcss.config.js
* cree los siguientes archivos para las fuentes de js y css

        touch src/index.js src/style.css
* ingrese lo siguiente en webpack.config.js

```js
const path = require('path');
module.exports = {
    entry: './src/index.js', // path to our input file
    output: {
        filename: 'index-bundle.js', // output bundle file name
        path: path.resolve(__dirname, './static'), // path to our Django static directory
    },
    module: {
        rules: [{
                test: /\.js$/i,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader', //ejecutara el Babel Loader a los .js
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [ //ejecutara los Loader a los archivos .css
                'style-loader',
                'css-loader',
                'postcss-loader'
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './static'),
        watchContentBase: true,
        open: true,
    },
};
```
* agrege el siguiente contenido a postcss.config.js

```js
const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        'postcss-preset-env',
        tailwindcss
    ],
};

```
* edite el archivo src/style.css e importe las clases de tailwindcss

```css
/* Importacion de postcss por webpack */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* 
metodo de importacion de tailwindCSS
@tailwind base;
@tailwind components;
@tailwind utilities; */
```
* importe el archivo style.css a src/index.js
```js
import './style.css';
```
* cree el archivo de configuracion de tailwind CSS con el siguiente comando

        npx tailwindcss init
creara un archivo con este contenido
```js
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
```
#* Solo nos queda ejecutar en la raiz del proyecto

        npm run dev
* o cuando ya tengamos una aplicacion js como React o Vue ejecutar

        npm run start
* Y si ya terminamos de trabajar en nuestro proyecto y queremos crear
el bundle final, utilizaremos el otro comando que es:

        npm run build

    con esto ya tendremos la base de webpack para gestionar, compilar y crear 
    nuestros archivos para el frontend de nuestra aplicacion
