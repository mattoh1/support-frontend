// @flow

// ----- Imports ----- //

import type { Settings } from 'helpers/settings';
import { getVariantsAsString, init as abInit } from '../abtest';
import type { Participations } from '../abtest';
import { GBPCountries, UnitedStates } from '../../internationalisation/countryGroup';

jest.mock('ophan', () => ({
  record: () => null,
}));

// ----- Tests ----- //

const emptySettings: Settings = {
  switches: { experiments: {} },
  amounts: { },
};

describe('basic behaviour of init', () => {

  beforeEach(() => {
    window.matchMedia = window.matchMedia || jest.fn(() => ({ matches: false }));
  });

  it('The user should be allocated in the control bucket', () => {
    document.cookie = 'GU_mvt_id=12346';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GB: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: true,
        seed: 0,
      },
    };

    const country = 'GB';
    const participations: Participations = abInit(country, GBPCountries, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'control' };

    expect(participations).toEqual(expectedParticipations);
  });

  it('The user should be allocated in the variant bucket', () => {

    document.cookie = 'GU_mvt_id=12345';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"variant"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GB: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: true,
        seed: 0,
      },
    };

    const country = 'GB';
    const participations: Participations = abInit(country, GBPCountries, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'variant' };

    expect(participations).toEqual(expectedParticipations);
  });

  it('The user should be allocated in the variant bucket', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GB: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 2,
      },
    };

    const country = 'GB';
    const countryGroupId = GBPCountries;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'variant' };

    expect(participations).toEqual(expectedParticipations);
  });

  it('The user should not be allocated in a test for a different country', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GB: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };

    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should check for both (min and max) breakpoints if they are provided', () => {
    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          US: {
            offset: 0,
            size: 1,
            breakpoint: {
              minWidth: 'tablet',
              maxWidth: 'desktop',
            },
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };
    const expectedMediaQuery = '(min-width:740px) and (max-width:980px)';

    expect(window.matchMedia).toHaveBeenCalledWith(expectedMediaQuery);
    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should check for min breakpoints if only min is provided', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          US: {
            offset: 0,
            size: 1,
            breakpoint: {
              minWidth: 'tablet',
            },
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };
    const expectedMediaQuery = '(min-width:740px)';

    expect(window.matchMedia).toHaveBeenCalledWith(expectedMediaQuery);
    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should check for min breakpoints if only min is provided and max is undefined', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          US: {
            offset: 0,
            size: 1,
            breakpoint: {
              minWidth: 'tablet',
              maxWidth: undefined,
            },
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };
    const expectedMediaQuery = '(min-width:740px)';

    expect(window.matchMedia).toHaveBeenCalledWith(expectedMediaQuery);
    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should check for max breakpoints if only max is provided', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          US: {
            offset: 0,
            size: 1,
            breakpoint: {
              maxWidth: 'tablet',
            },
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };
    const expectedMediaQuery = '(max-width:740px)';

    expect(window.matchMedia).toHaveBeenCalledWith(expectedMediaQuery);
    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should be able to differentiate country groups', () => {

    document.cookie = 'GU_mvt_id=12346';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GBPCountries: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: true,
        seed: 0,
      },
    };

    const country = 'GI';
    const countryGroupId = GBPCountries;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'control' };

    expect(participations).toEqual(expectedParticipations);
  });

  it('The ab test framework should check for min breakpoints if only max is provided and min is undefined', () => {

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          US: {
            offset: 0,
            size: 1,
            breakpoint: {
              minWidth: undefined,
              maxWidth: 'tablet',
            },
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 0,
      },
    };

    const country = 'US';
    const countryGroupId = UnitedStates;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };
    const expectedMediaQuery = '(min-width:740px)';

    expect(window.matchMedia).toHaveBeenCalledWith(expectedMediaQuery);
    expect(participations).toEqual(expectedParticipations);
  });

  it('A post-deployment test user should not be allocated into a test', () => {

    const postDeploymentTestCookie = '_post_deploy_user=true; path=/;';

    function deleteCookie() {
      document.cookie = `${postDeploymentTestCookie} expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }

    document.cookie = postDeploymentTestCookie;

    document.cookie = 'GU_mvt_id=12346';

    const tests = {
      mockTest: {
        type: 'OTHER',
        variants: [{ id: 'control' }, { id: 'variant' }],
        audiences: {
          GB: {
            offset: 0,
            size: 1,
          },
        },
        isActive: true,
        referrerControlled: false,
        seed: 2,
      },
    };

    const country = 'GB';
    const countryGroupId = GBPCountries;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = { mockTest: 'notintest' };

    expect(participations).toEqual(expectedParticipations);

    deleteCookie();
  });

});

describe('Correct allocation in a multi test environment', () => {
  /*
  GB: |                    100%                      |
                           Test1

  US: |  20%   |        60%                |   20%   |
        Test 1         Test 2              Not in Test

  Test 3 is 100% GB, but canRun is false
   */

  const tests = {
    mockTest: {
      type: 'OTHER',
      variants: [{ id: 'control' }, { id: 'variant' }],
      audiences: {
        GB: {
          offset: 0,
          size: 1,
        },
        US: {
          offset: 0,
          size: 0.2,
        },
      },
      isActive: true,
      referrerControlled: true,
      seed: 0,
    },

    mockTest2: {
      type: 'OTHER',
      variants: [{ id: 'control' }, { id: 'variant' }],
      audiences: {
        US: {
          offset: 0.2,
          size: 0.6,
        },
      },
      isActive: true,
      referrerControlled: true,
      seed: 0,
    },

    mockTest3: {
      type: 'OTHER',
      variants: [{ id: 'control' }, { id: 'variant' }],
      audiences: {
        GB: {
          offset: 0,
          size: 1,
        },
      },
      isActive: true,
      canRun: () => false,
      referrerControlled: true,
      seed: 0,
    },
  };

  it('It correctly segments a user who has a cookie in the top 80% in GB', () => {

    document.cookie = 'GU_mvt_id=810000';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    const country = 'GB';
    const countryGroupId = GBPCountries;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = {
      mockTest: 'control', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);
  });

  it('It correctly segments a user who has a cookie above 80% in US', () => {

    document.cookie = 'GU_mvt_id=810000';
    window.history.pushState({}, 'Test Title', '/test.html');
    const country = 'US';
    const countryGroupId = GBPCountries;
    const participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    const expectedParticipations: Participations = {
      mockTest: 'notintest', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);
  });

  it('It correctly segments a user who has a cookie between 20% and 80% in GB', () => {

    document.cookie = 'GU_mvt_id=510000';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    const country = 'GB';
    const countryGroupId = GBPCountries;
    let participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    let expectedParticipations: Participations = {
      mockTest: 'control', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);

    document.cookie = 'GU_mvt_id=510001';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"variant"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    participations = abInit(country, countryGroupId, emptySettings, tests);
    expectedParticipations = {
      mockTest: 'variant', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);
  });

  it('It correctly segments a user who has a cookie between 20% and 80% in US', () => {

    document.cookie = 'GU_mvt_id=510000';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest2"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    const country = 'US';
    const countryGroupId = UnitedStates;
    let participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    let expectedParticipations: Participations = {
      mockTest: 'notintest', mockTest2: 'control',
    };
    expect(participations).toEqual(expectedParticipations);

    document.cookie = 'GU_mvt_id=510001';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest2"%2C"variant"%3A"variant"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    participations = abInit(country, countryGroupId, emptySettings, tests);
    expectedParticipations = {
      mockTest: 'notintest', mockTest2: 'variant',
    };
    expect(participations).toEqual(expectedParticipations);
    expect(getVariantsAsString(participations)).toEqual('mockTest=notintest; mockTest2=variant');
  });

  it('It correctly segments a user who has a cookie between 0 and 20% in GB', () => {

    document.cookie = 'GU_mvt_id=150000';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    const country = 'GB';
    const countryGroupId = GBPCountries;

    let participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    let expectedParticipations: Participations = {
      mockTest: 'control', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);

    document.cookie = 'GU_mvt_id=150001';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"variant"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    participations = abInit(country, countryGroupId, emptySettings, tests);
    expectedParticipations = {
      mockTest: 'variant', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);
  });

  it('It correctly segments the user a user who has a cookie between 0 and 20% in US', () => {

    document.cookie = 'GU_mvt_id=150000';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"control"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    const country = 'US';
    const countryGroupId = UnitedStates;

    let participations: Participations = abInit(country, countryGroupId, emptySettings, tests);
    let expectedParticipations: Participations = {
      mockTest: 'control', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);

    document.cookie = 'GU_mvt_id=150001';
    window.history.pushState({}, 'Test Title', '/test.html?REFPVID=k4y4pskfmzdovtkfwfae&INTCMP=gdnwb_copts_banner_subscribe_SubscriptionBanner&acquisitionData=%7B"source"%3A"GUARDIAN_WEB"%2C"componentId"%3A"acquisitions-subscription-banner"%2C"componentType"%3A"ACQUISITIONS_SUBSCRIPTIONS_BANNER"%2C"campaignCode"%3A"gdnwb_copts_banner_subscribe_SubscriptionBanner"%2C"abTest"%3A%7B"name"%3A"mockTest"%2C"variant"%3A"variant"%7D%2C"referrerPageviewId"%3A"k4y4pskfmzdovtkfwfae"%2C"referrerUrl"%3A"http%3A%2F%2Flocalhost%3A3000%2Fuk"%7D');
    participations = abInit(country, GBPCountries, emptySettings, tests);
    expectedParticipations = {
      mockTest: 'variant', mockTest2: 'notintest',
    };
    expect(participations).toEqual(expectedParticipations);
  });

});
