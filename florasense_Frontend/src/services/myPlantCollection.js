import { supabase } from '../lib/supabase';


export const addPlantToCollection = async (plant, userId) => {
  try {
    const { data, error } = await supabase
      .from('myplants')
      .insert([
        {
          plant_id: plant.id.toString(),
          common_name: plant.common_name,
          plant_type: plant.type || null,
          reference: 'perenual',
          user_id: userId,
          image_path: plant.default_image?.original_url || null
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding plant to collection:', error);
    throw error;
  }
};

export const checkPlantInCollection = async (plantId, userId) => {
  try {
    const { data, error } = await supabase
      .from('myplants')
      .select('id')
      .eq('plant_id', plantId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking plant collection:', error);
    throw error;
  }
};

export const removePlantFromCollection = async (plantId, userId) => {
  try {

    // Delete the plant record
    const { error } = await supabase
      .from('myplants')
      .delete()
      .eq('plant_id', plantId)
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing plant from collection:', error);
    throw error;
  }
};