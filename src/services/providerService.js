import providersData from '../data/providers.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProviders = async () => {
  return providersData.providers;
};

export const getProviderById = async (id) => {
  const provider = providersData.providers.find(p => p.id === parseInt(id));
  if (!provider) {
    throw new Error('Provider not found');
  }
  return provider;
}; 