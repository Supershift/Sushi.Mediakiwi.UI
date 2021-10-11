/// <binding ProjectOpened='Watch - Development' />
var path = require('path');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
var spreadPlugin = require('babel-plugin-transform-object-rest-spread');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// All files to compile
// { source: "", target: "", targetMin: "" },

const vueBundles = [
    { source: "./pilot-app/src/main.js", target: "./pilot-app/dist/bundle.js", targetMin: "./pilot-app/dist/bundle.min.js" },

];

// { source: "", target: "" },
const minify = [];

// Base configuration of the webpack jobs
var config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#source-map',
    plugins: [
        new VueLoaderPlugin()
    ]
};

// define an [] for the apps
let vueApps = [];
let javscriptApps = [];

// Loop through all entries
for (let _entry of vueBundles) {

    // add a config for the entries to the app array in development mode
    vueApps.push(Object.assign({}, config, {
        entry: _entry.source,
        output: {
            path: path.resolve(__dirname),
            filename: _entry.target,
        },
        devtool: '#source-map',
        mode: 'development',
    }));

    // add a config for the entries to the app array in production mode
    vueApps.push(Object.assign({}, config, {
        entry: _entry.source,
        output: {
            path: path.resolve(__dirname),
            filename: _entry.targetMin,
        },
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                }),
            ],
        },
    }));
}

// Loop through all entries
for (let __entry of minify) {
    // add a config for the entries to the app array in production mode
    javscriptApps.push(Object.assign({}, config, {
        entry: __entry.source,
        output: {
            path: path.resolve(__dirname),
            filename: __entry.target,
        },
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                }),
            ],
        },
    }));
}

// Return Array of Configurations
module.exports = (env, argv) => {
    // always build the javscript apps to production mode
    let tasks = [...javscriptApps];

    // argv.mode can be development or production
    const mode = argv.mode ? argv.mode : "development";

    // add the vueApps for the develop mode
    const vueTasks = vueApps.filter((x) => x.mode === mode);
    tasks = tasks.concat(vueTasks);

    console.log(`building ${tasks.length} apps; on ${new Date()}`)

    // return the taks
    return tasks;
};
