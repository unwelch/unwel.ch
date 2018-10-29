import { Selector, ClientFunction } from 'testcafe'

export const getLocation = ClientFunction(() => document.location.pathname)
export const dataQaSelector = dataQa => `[data-qa="${dataQa}"]`
export const dataQaExists = dataQa => Selector(dataQaSelector(dataQa)).exists
