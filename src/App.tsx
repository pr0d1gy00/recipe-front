import {Routes, Route} from 'react-router-dom';
import {Layout} from "./components/Layout.tsx";
import {Ingredients} from "./components/Ingredients.tsx";
import {RegisterIngredients} from "./components/RegisterIngredients.tsx";
import {CategoryList} from "./components/CategoryList.tsx";
import {CategoryForm} from "./components/CategoryForm.tsx";
import {UnitList} from "./components/UnitList.tsx";
import {UnitForm} from "./components/UnitForm.tsx";
import {RecipeList} from "./components/RecipeList.tsx";
import {RecipeForm} from "./components/RecipeForm.tsx";
import {Home} from "./components/Home.tsx";
import {PurchaseList} from "./components/PurchaseList.tsx";

function App() {

    return (
        <Routes>

            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/ingredients" element={<Ingredients/>}/>
                <Route path="/register-ingredient" element={<RegisterIngredients/>}/>
                <Route path="/edit-ingredient/:id" element={<RegisterIngredients/>}/>
                <Route path="/categories" element={<CategoryList/>}/>
                <Route path="/create-category" element={<CategoryForm/>}/>
                <Route path="/edit-category/:id" element={<CategoryForm/>}/>
                <Route path="/units" element={<UnitList/>}/>
                <Route path="/create-unit" element={<UnitForm/>}/>
                <Route path="/edit-unit/:id" element={<UnitForm/>}/>
                <Route path="/recipes" element={<RecipeList/>}/>
                <Route path="/create-recipe" element={<RecipeForm/>}/>
                <Route path="/edit-recipe/:id" element={<RecipeForm/>}/>
                <Route path="/purchase" element={<PurchaseList/>}/>

            </Route>
        </Routes>
    )
}

export default App
