import event_categoriesRepository from '../repositories/events_catogories-repository.js';
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();
export default class events_CategoriesService
{

    getAllCategories = async() =>
     {
    const repo = new event_categoriesRepository;
    const categories = await repo.getAllCateogories();
    return categories;
    };
    GetCategoryByid = async(id) =>
    {
    const repo = new event_categoriesRepository;
    const categoriesID = await repo.getCateogoryById(id);
    return categoriesID;
    };

    createCategory = async(entity) =>
    {
    const repo = new event_categoriesRepository;
    const msg = await repo.createCategory(entity.name, entity.display_order);
    return msg;
    };
    updateCategory = async(entity) =>
    {
        const repo = new event_categoriesRepository;
        const msg = await repo.UpdateCategory(entity);
        return msg;
    }

    deleteCategory = async(id)=>
    {
        const repo = new event_categoriesRepository;
        const msg = await repo.deleteCategory(id);
        return msg;
    };
}
