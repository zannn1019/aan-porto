import identityData from '~/data/identity.json'

export const useIdentity = () => {
    const identity = identityData

    return {
        personal: identity.personal,
        branding: identity.branding,
        hero: identity.hero,
        about: identity.about,
        contact: identity.contact,
        navigation: identity.navigation,
      footer: identity.footer,
      seo: identity.seo
  }
}
