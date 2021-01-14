import Rails from "@rails/ujs";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import {App} from "../components/app";
import '../less/main.less';

Rails.start();
ActiveStorage.start();

import React from 'react';
import ReactDOM from 'react-dom';
import {Competitors} from '../mocks/competitors';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App competitors={Competitors}/>,
    document.body.appendChild(document.createElement('div')),
  )
})
