import AddItemPage from "./components/AddItemPage";
import ViewItemPage from "./components/ViewItemPage";
import MainPage from './components/MainPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AllItemsPage from "./components/AllItemsPage";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

export default function App() {
  return <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/add-item'} element={<AddItemPage/>}/>
      <Route path={'/catalog'} element={<AllItemsPage/>}/>
      <Route path={'/view-item/:id'} element={<ViewItemPage/>}/>
    </Routes>
    <FooterComponent/>
  </BrowserRouter>
}