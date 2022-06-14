const Category = require('../models/category');
const Logger = require('../logger');

const insertDefaultCategories = async () => {
    Logger.info(`Default Categories begin for insert`)

    const defaultCategories = [
        {
            category: 'Installation'
        },
        {
            category: 'Activation'
        },
        {
            category: 'License'
        },
        {
            category: 'Bug Report'
        },
        {
            category: 'Feature Request' 
        },  
        {
            category: 'Feature Request'
        },
        {
            category: 'Feature Request'
        },
        {
            category: 'Analytics'
        },
        {
            category: 'Tools'
        },
        {
            category: 'Global Activations'
        },
        {
            category: 'Settings'
        }
    ];

    for(const cat of defaultCategories){
        const count =  await Category.countDocuments({category: cat.category})
        count == 0 &&   await new Category(cat).save()
    }

}  

module.exports = insertDefaultCategories