import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const createUserProfile = async (userId, email, fullName, avatarUrl = null) => {
  try {
    console.log('Creating user profile:', { userId, email, fullName, avatarUrl });
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating profile:', error);
      throw error;
    }
    
    console.log('Created user profile:', data);
    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserFullName = async (userId, fullName) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ full_name: fullName })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user full name:', error);
    throw error;
  }
};

export const uploadAvatar = async (userId, file) => {
  try {
    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Delete old avatar if exists
    const { data: oldFiles } = await supabase
      .storage
      .from('avatars')
      .list(userId);

    if (oldFiles?.length) {
      await supabase
        .storage
        .from('avatars')
        .remove(oldFiles.map(f => `${userId}/${f.name}`));
    }

    // Upload new avatar
    const { data, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Update user profile
    const { data: userData, error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) throw updateError;

    return userData;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};

export const handleAuthUser = async (session) => {
  try {
    console.log('Handling auth user, session:', session);
    
    // Extract user from session correctly
    const authUser = session?.user || session;
    if (!authUser?.id) {
      console.error('No valid user ID found in session');
      return null;
    }

    // First try to get existing profile
    try {
      const existingProfile = await getUserProfile(authUser.id);
      if (existingProfile) {
        console.log('Found existing profile:', existingProfile);
        return existingProfile;
      }
    } catch (error) {
      console.log('No existing profile found, creating new one');
    }

    // Create new profile if doesn't exist
    const userData = {
      id: authUser.id,
      email: authUser.email,
      fullName: authUser.user_metadata?.full_name || 
                authUser.raw_user_meta_data?.full_name ||
                authUser.user_metadata?.name ||
                authUser.email?.split('@')[0] ||
                'Unknown',
      avatarUrl: authUser.user_metadata?.avatar_url ||
                 authUser.raw_user_meta_data?.avatar_url
    };

    console.log('Creating new profile with data:', userData);
    
    const newProfile = await createUserProfile(
      userData.id,
      userData.email,
      userData.fullName,
      userData.avatarUrl
    );

    return newProfile;
  } catch (error) {
    console.error('Error in handleAuthUser:', error);
    throw error;
  }
};