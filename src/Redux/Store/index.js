import { createStore, combineReducers} from 'redux';
import { AppReducer } from '../Reducer';


const Reducer = combineReducers({
    AppReducer
});


const store = createStore(Reducer);


export { store };