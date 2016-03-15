/**
 * Created by sophiawang on 3/10/16.
 */

const path = require('path');

module.exports = [{
    context: path.join(__dirname, "client", "studentJS"),
    entry: "roommate_app",
    output: {
        path: path.join(__dirname, "client", "studentJS"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader?harmony"}
        ]
    },
    resolve: {
        // You can now require('file') instead of require('file.coffee')
        extensions: ["", ".js", ".jsx"],
        root: [path.join(__dirname, "public", "javascripts")],
        modulesDirectories: ["node_modules"]
    }
}];

/*

const ExtractTextPlugin = require('extract-text-webpack-plugin');


const CLIENT_DIR = path.resolve(__dirname, 'client');
const SERVER_DIR = path.resolve(__dirname, 'server');
const DIST_DIR = path.resolve(__dirname, 'dist');

const loaders = [{
    test: /\.js$/,
    include: CLIENT_DIR,
    loader: 'babel-loader',
    query: {
        presets: ['es2015', 'react']
    }
},
    {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
    }
];

module.exports = [{
    name: 'client',
    target: 'web',
    context: CLIENT_DIR,
    entry: 'studentJS/current_roommate.js',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: loaders
    },
    resolve: {
        alias: {
            components: path.resolve(CLIENT_DIR, 'components')
        }
    }
},
    {
        name: 'server',
        target: 'node',
        context: CLIENT_DIR,
        entry: {
            app: 'studentJS/current_roommate.js'
        },
        output: {
            path: SERVER_DIR,
            filename: '[name].js',
            libraryTarget: 'commonjs2'
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
            loaders: loaders
        },
        resolve: {
            alias: {
                components: path.resolve(CLIENT_DIR, 'components')
            }
        },
        plugins: [
        new ExtractTextPlugin('[name].css')
    ]

        context: path.join(__dirname, "public", "javascripts"),
        entry: "app",
        output: {
            path: path.join(__dirname, "public", "javascripts"),
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.jsx$/, loader: "jsx-loader?harmony"}
            ]
        },
        resolve: {
            // You can now require('file') instead of require('file.coffee')
            extensions: ["", ".js", ".jsx"],
            root: [path.join(__dirname, "public", "javascripts")],
            modulesDirectories: ["node_modules"]
        }

    }];*/
