// @flow

// ----- Imports ----- //

import React from 'react';


// ----- Catalogue ----- //

type svgPath = {
  d: string,
  class: ?string,
};

type svg = {
  paths: svgPath[],
  viewBox: string,
};

const svgsCatalog: {
  'amex-logo': svg,
  'arrow-right-straight': svg,
  'credit-card': svg,
  'exclamation': svg,
  facebook: svg,
  'guardian-titlepiece': svg,
  'mastercard-logo': svg,
  lock: svg,
  'paypal-logo': svg,
  'paypal-p-logo': svg,
  twitter: svg,
  user: svg,
  video: svg,
  'visa-logo': svg,
} = {
  'amex-logo': {
    viewBox: '0 0 21 20',
    paths: [
      {
        d: 'M19.7096887,0.0452 L0.0149245283,0.0452 L0.0149245283,19.9994667 L19.7096887,19.9994667 L19.7096887,13.4124 C19.7886038,13.3001333 19.8273019,13.1531333 19.8273019,12.9741333 C19.8273019,12.7698 19.7886038,12.6444667 19.7096887,12.5387333 L19.7096887,0.0452',
        class: null,
      },
      {
        d: 'M1.13756604,10.1480667 L2.08408491,10.1480667 L2.2970566,9.62753333 L2.77464151,9.62753333 L2.98682075,10.1480667 L4.8485566,10.1480667 L4.8485566,9.75113333 L5.01424528,10.1503333 L5.97965094,10.1503333 L6.14428302,9.74626667 L6.14428302,10.1480667 L10.7698962,10.1480667 L10.7687736,9.2956 L10.8579906,9.2956 C10.9208585,9.2972 10.9391509,9.30373333 10.9391509,9.40786667 L10.9391509,10.1480667 L13.3307736,10.1480667 L13.3307736,9.94913333 C13.5236698,10.0548667 13.8238774,10.1480667 14.2176604,10.1480667 L15.2255283,10.1480667 L15.4397547,9.62753333 L15.9185283,9.62753333 L16.1290566,10.1480667 L18.0678585,10.1480667 L18.0678585,9.6546 L18.3622547,10.1480667 L19.9143396,10.1480667 L19.9143396,6.88713333 L18.376717,6.88713333 L18.376717,7.27326667 L18.1624245,6.88713333 L16.5835283,6.88713333 L16.5835283,7.27326667 L16.3863396,6.88713333 L14.2552358,6.88713333 C13.898566,6.88713333 13.5832358,6.93706667 13.3307736,7.07746667 L13.3307736,6.88713333 L11.8609057,6.88713333 L11.8609057,7.07746667 C11.6981887,6.9332 11.4790094,6.88713333 11.2351321,6.88713333 L5.8614434,6.88713333 L5.49883019,7.7294 L5.13086792,6.88713333 L3.4380566,6.88713333 L3.4380566,7.27326667 L3.25064151,6.88713333 L1.80824528,6.88713333 L1.13756604,8.436 L1.13756604,10.1480667 Z M19.421566,9.68826667 L18.6372358,9.68826667 L17.5881604,7.93493333 L17.589217,9.68826667 L16.4616226,9.68826667 L16.2455472,9.16706667 L15.0938491,9.16706667 L14.8875472,9.68826667 L14.2386604,9.68826667 C13.9679057,9.68826667 13.6283396,9.62753333 13.436566,9.43006667 C13.2405,9.23053333 13.1411792,8.96266667 13.1411792,8.53746667 C13.1411792,8.1898 13.2023962,7.87306667 13.4387453,7.6242 C13.6191604,7.43653333 13.898566,7.35033333 14.2805283,7.35033333 L14.8139811,7.35033333 L14.8139811,7.85033333 L14.2918868,7.85033333 C14.0888208,7.85033333 13.9738491,7.8812 13.8631698,7.98966667 C13.770717,8.08893333 13.7051415,8.2744 13.7051415,8.51953333 C13.7051415,8.7712 13.7534811,8.95013333 13.8594057,9.06893333 C13.9421509,9.16053333 14.0978679,9.1888 14.2434811,9.1888 L14.4921132,9.1888 L15.2727453,7.35033333 L16.1005943,7.35033333 L17.0375377,9.56133333 L17.0375377,7.35033333 L17.8830849,7.35033333 L18.8553585,8.97833333 L18.8553585,7.35033333 L19.421566,7.35033333 L19.421566,9.68826667 Z M12.3047453,9.68826667 L12.8697642,9.68826667 L12.8697642,7.35033333 L12.3047453,7.35033333 L12.3047453,9.68826667 Z M11.984066,7.98153333 C11.984066,8.35086667 11.7373491,8.54666667 11.5951038,8.6036 C11.7153585,8.65186667 11.8180472,8.73213333 11.8657925,8.801 C11.9448396,8.91546667 11.9602925,9.02226667 11.9602925,9.2278 L11.9602925,9.68826667 L11.4016132,9.68826667 L11.3989717,9.39326667 C11.3989717,9.25493333 11.4129057,9.051 11.3098868,8.9398 C11.229783,8.85573333 11.1083396,8.839 10.9074528,8.839 L10.3121887,8.839 L10.3121887,9.68826667 L9.75991509,9.68826667 L9.75991509,7.35033333 L11.032066,7.35033333 C11.3151698,7.35033333 11.5241132,7.35953333 11.704066,7.46313333 C11.8797925,7.56613333 11.984066,7.71906667 11.984066,7.98153333 L11.984066,7.98153333 Z M9.37557547,9.68826667 L7.52625472,9.68826667 L7.52625472,7.35033333 L9.37557547,7.35033333 L9.37557547,7.83786667 L8.08116981,7.83786667 L8.08116981,8.25866667 L9.34328302,8.25866667 L9.34328302,8.73806667 L8.08116981,8.737 L8.08116981,9.20453333 L9.37557547,9.20453333 L9.37557547,9.68826667 Z M7.11398113,9.68826667 L6.5479717,9.68826667 L6.54420755,7.85953333 L5.74270755,9.68826667 L5.25706604,9.68826667 L4.45048113,7.85513333 L4.45048113,9.68826667 L3.32480189,9.68826667 L3.1125566,9.16706667 L1.9594717,9.16706667 L1.74610377,9.68826667 L1.14337736,9.68826667 L2.13367925,7.35033333 L2.95756604,7.35033333 L3.89820755,9.5646 L3.89820755,7.35033333 L4.80285849,7.35033333 L5.52696226,8.93766667 L6.19288679,7.35033333 L7.11398113,7.35033333 L7.11398113,9.68826667 Z M16.0570755,8.67953333 L15.673066,7.74886667 L15.293217,8.67953333 L16.0570755,8.67953333 Z M11.2587736,8.3102 C11.1840189,8.35413333 11.093283,8.3568 10.9859057,8.3568 L10.3121887,8.3568 L10.3121887,7.83786667 L10.9923113,7.83786667 C11.0911038,7.83786667 11.1921415,7.8416 11.257717,7.8796 C11.3296981,7.91433333 11.3737453,7.98646667 11.3737453,8.0852 C11.3737453,8.18926667 11.3306887,8.27006667 11.2587736,8.3102 L11.2587736,8.3102 Z M2.91292453,8.67953333 L2.5345283,7.74886667 L2.15738679,8.67953333 L2.91292453,8.67953333 L2.91292453,8.67953333 Z',
        class: null,
      },
      {
        d: 'M11.8657925,1.27773333 C11.8657925,1.92686667 11.3866226,2.06193333 10.9030943,2.06193333 L10.2117453,2.06193333 L10.2117453,2.84613333 L9.13757547,2.84613333 L8.45507547,2.07286667 L7.74708491,2.84613333 L5.55436792,2.84613333 L5.55436792,0.507133333 L7.78056604,0.507133333 L8.46207547,1.27333333 L9.16577358,0.507133333 L10.9343302,0.507133333 C11.3737453,0.507133333 11.8657925,0.6302 11.8657925,1.27773333 L11.8657925,1.27773333 Z M7.46635849,2.35693333 L6.10479245,2.35693333 L6.10479245,1.89326667 L7.32028302,1.89326667 L7.32028302,1.41606667 L6.10479245,1.41606667 L6.10479245,0.992533333 L7.49184906,0.992533333 L8.09668868,1.67366667 L7.46635849,2.35693333 Z M9.66,2.63406667 L8.81121698,1.68073333 L9.66,0.760333333 L9.66,2.63406667 Z M10.9278585,1.5858 L10.2117453,1.5858 L10.2117453,0.992533333 L10.9343302,0.992533333 C11.1341604,0.992533333 11.2727075,1.07166667 11.2727075,1.27773333 C11.2727075,1.48166667 11.140566,1.5858 10.9278585,1.5858 L10.9278585,1.5858 Z M14.6619623,0.507133333 L16.5110849,0.507133333 L16.5110849,0.992533333 L15.2147642,0.992533333 L15.2147642,1.41606667 L16.4782642,1.41606667 L16.4782642,1.89326667 L15.2147642,1.89326667 L15.2147642,2.35693333 L16.5110849,2.3602 L16.5110849,2.84613333 L14.6619623,2.84613333 L14.6619623,0.507133333 Z M13.9629528,1.75826667 C14.0855849,1.80486667 14.1870189,1.88633333 14.2338396,1.95566667 C14.3122925,2.0706 14.3246415,2.17633333 14.3256981,2.38186667 L14.3256981,2.84613333 L13.770717,2.84613333 L13.770717,2.55213333 C13.770717,2.41226667 13.7825377,2.2046 13.6810377,2.09613333 C13.600934,2.0104 13.4774434,1.99086667 13.2749057,1.99086667 L12.6823491,1.99086667 L12.6823491,2.84613333 L12.1279623,2.84613333 L12.1279623,0.507133333 L13.4048679,0.507133333 C13.6863868,0.507133333 13.8905755,0.519666667 14.0715849,0.6194 C14.2456604,0.724066667 14.3546887,0.872133333 14.3546887,1.1378 C14.3546887,1.50926667 14.1086981,1.70026667 13.9629528,1.75826667 L13.9629528,1.75826667 Z M13.6283396,1.4692 C13.5558302,1.51206667 13.4629151,1.51686667 13.356,1.51686667 L12.6823491,1.51686667 L12.6823491,0.992533333 L13.3661698,0.992533333 C13.4629151,0.992533333 13.5633585,0.9942 13.6283396,1.0332 C13.6998585,1.07166667 13.7433113,1.1422 13.7433113,1.2436 C13.7433113,1.34446667 13.6998585,1.4242 13.6283396,1.4692 L13.6283396,1.4692 Z M18.6222453,1.61286667 C18.7328585,1.72573333 18.789783,1.86833333 18.789783,2.10746667 C18.789783,2.6124 18.4772264,2.84613333 17.920066,2.84613333 L16.8408774,2.84613333 L16.8408774,2.34393333 L17.9152453,2.34393333 C18.0216321,2.34393333 18.0947358,2.33033333 18.1414245,2.28646667 C18.179066,2.2512 18.206934,2.19966667 18.206934,2.13513333 C18.206934,2.06633333 18.1785377,2.0104 18.1397736,1.97953333 C18.0962547,1.9426 18.0393962,1.92906667 17.942717,1.92686667 C17.424783,1.90846667 16.7769528,1.9426 16.7769528,1.20293333 C16.7769528,0.865066667 16.9880755,0.507133333 17.5676887,0.507133333 L18.6769906,0.507133333 L18.6769906,1.005 L17.6637736,1.005 C17.5607547,1.005 17.4957075,1.00986667 17.4399057,1.04673333 C17.3796792,1.08466667 17.3576887,1.1422 17.3576887,1.21533333 C17.3576887,1.30426667 17.4097925,1.36453333 17.479066,1.39053333 C17.5371132,1.4106 17.5983302,1.41606667 17.6923679,1.41766667 L17.9920472,1.4242 C18.2935094,1.43286667 18.4970377,1.48486667 18.6222453,1.61286667 L18.6222453,1.61286667 Z M20.8323302,2.54573333 C20.6963585,2.74633333 20.434783,2.84613333 20.0807547,2.84613333 L19.0112075,2.84613333 L19.0112075,2.34393333 L20.075934,2.34393333 C20.1816604,2.34393333 20.2554245,2.33033333 20.3005283,2.28646667 C20.3381038,2.2512 20.3665,2.19966667 20.3665,2.13513333 C20.3665,2.06633333 20.3381038,2.0104 20.2988774,1.97953333 C20.2563491,1.9426 20.1994906,1.92906667 20.1038679,1.92686667 C19.5843491,1.90846667 18.9359906,1.9426 18.9359906,1.20293333 C18.9359906,0.865066667 19.1492264,0.507133333 19.7289057,0.507133333 L20.8323302,0.507133333 L20.8323302,0.0428666667 L19.8072264,0.0428666667 C19.4973774,0.0428666667 19.272783,0.116133333 19.1142925,0.233333333 L19.1142925,0.0428666667 L17.5983302,0.0428666667 C17.3576887,0.0428666667 17.0734623,0.1036 16.9375566,0.233333333 L16.9391415,0.0428666667 L14.231066,0.0428666667 L14.231066,0.233333333 C14.015717,0.0776 13.6531038,0.0428666667 13.4855,0.0428666667 L11.7019528,0.0428666667 L11.7019528,0.233333333 C11.528934,0.0678666667 11.1523868,0.0428666667 10.9208585,0.0428666667 L8.92295283,0.0428666667 L8.46524528,0.5424 L8.03791509,0.0428666667 L5.05373585,0.0428666667 L5.05373585,3.30553333 L7.98072642,3.30553333 L8.45289623,2.79846667 L8.89693396,3.30553333 L10.7011509,3.306 L10.7011509,2.5386 L10.8794528,2.5386 C11.1169906,2.54133333 11.4016132,2.5338 11.649783,2.42633333 L11.649783,3.30553333 L13.139,3.30553333 L13.139,2.45506667 L13.2099245,2.45506667 C13.3023113,2.45506667 13.3114245,2.45993333 13.3114245,2.5506 L13.3114245,3.30553333 L17.834217,3.30553333 C18.1195,3.30553333 18.4181226,3.23126667 18.5856604,3.09673333 L18.5856604,3.30553333 L20.0205943,3.30553333 C20.3198774,3.30553333 20.6103774,3.26433333 20.8323302,3.15526667 L20.8323302,2.54573333 Z M20.8323302,1.005 L19.8218208,1.005 C19.7208491,1.005 19.6541509,1.00986667 19.5988113,1.04673333 C19.5419528,1.08466667 19.517717,1.1422 19.517717,1.21533333 C19.517717,1.30426667 19.5671792,1.36453333 19.640283,1.39053333 C19.6971415,1.4106 19.7594811,1.41606667 19.8524623,1.41766667 L20.1516132,1.4242 C20.4546604,1.43286667 20.6566698,1.48486667 20.7818113,1.61286667 C20.8016887,1.62973333 20.8172736,1.65193333 20.8323302,1.67206667 L20.8323302,1.005 L20.8323302,1.005 Z',
        class: null
      },
      {
        d: 'M0.644924528,8.8882 L0.562707547,8.8882 C0.551943396,8.85506667 0.549830189,8.79326667 0.549830189,8.77753333 C0.549830189,8.74546667 0.544943396,8.71513333 0.488349057,8.71513333 L0.366311321,8.71513333 L0.36690566,8.8882 L0.294066038,8.8882 L0.294066038,8.4652 L0.488349057,8.4652 C0.555179245,8.4652 0.629537736,8.4906 0.629537736,8.585 C0.629537736,8.63813333 0.606556604,8.662 0.58390566,8.67986667 C0.603320755,8.6908 0.619433962,8.70813333 0.622075472,8.75533333 L0.624188679,8.82953333 C0.625311321,8.85026667 0.627424528,8.85393333 0.644924528,8.86433333 L0.644924528,8.8882 Z M0.554650943,8.5888 C0.554650943,8.5362 0.518924528,8.53133333 0.492113208,8.53133333 L0.366311321,8.53133333 L0.366311321,8.6484 L0.482933962,8.6484 C0.521103774,8.6484 0.554650943,8.64033333 0.554650943,8.5888 L0.554650943,8.5888 Z M0.898443396,8.68093333 C0.898443396,8.43206667 0.698084906,8.22973333 0.449849057,8.22973333 C0.201745283,8.22973333 0,8.43206667 0,8.68093333 C0,8.93153333 0.201745283,9.13333333 0.449849057,9.13333333 C0.698084906,9.13333333 0.898443396,8.93153333 0.898443396,8.68093333 L0.898443396,8.68093333 Z M0.831018868,8.68093333 C0.831018868,8.89466667 0.6685,9.0672 0.449849057,9.0672 C0.230471698,9.0672 0.069009434,8.89466667 0.069009434,8.68093333 C0.069009434,8.46946667 0.229877358,8.29646667 0.449849057,8.29646667 C0.670084906,8.29646667 0.831018868,8.46946667 0.831018868,8.68093333 L0.831018868,8.68093333 Z',
        class: null
      },
    ],
  },
  'arrow-right-straight': {
    viewBox: '0 0 20 17.89',
    paths: [
      {
        d: 'M20 9.35l-9.08 8.54-.86-.81 6.54-7.31H0V8.12h16.6L10.06.81l.86-.81L20 8.51v.84z',
        class: null,
      },
    ],
  },
  'credit-card': {
    viewBox: '0 0 44 28.1',
    paths: [
      {
        d: 'M0 10.1v15l3 3h38.1l2.9-3.2V10.1M44 6.1V3l-2.9-3H3L0 3v3.1',
        class: null,
      },
    ],
  },
  exclamation: {
    viewBox: '0 0 2.2 8.9',
    paths: [
      {
        d: 'M1.1 8.9C.5 8.9 0 8.4 0 7.8c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1zM.6 0h1.1l.4.4-.4 5.2H.6L.2.4.6 0z',
        class: null,
      },
    ],
  },
  facebook: {
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M10.897 8.371h-2.229v5.943h-2.154v-5.943h-1.485v-2.154h1.485v-1.783c0-1.412.817-2.748 2.971-2.748.892 0 1.485.074 1.485.074v2.229h-1.337c-.743 0-.892.371-.892.966v1.337h2.229l-.074 2.08z',
        class: null,
      },
    ],
  },
  'guardian-titlepiece': {
    viewBox: '0 0 160 30',
    paths: [
      {
        d: 'M122.8.1c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7M142.5 22.1h8.3v-1.4l-1.6-.8v-9.8c.6-.4 1.3-.6 2.1-.6 1.4 0 2 .6 2 2.1V20l-1.6.8v1.4h8.3v-1.4l-1.7-.8v-9.4c0-2.8-1.3-4.1-3.8-4.1-2.1 0-4.1.7-5.4 2v-2h-.4l-6.3 1v1.3l1.7.8V20l-1.7.8v1.3zM118.9 7.4v1.4l1.8.8v10.3l-1.7.8v1.4h8.3v-1.4l-1.6-.8V6.4h-.4zM111.9 19.2c-.4.3-.8.5-1.5.5-2 0-3-1.6-3-5.4 0-4.3 1.2-5.7 2.8-5.7.9 0 1.3.3 1.7.7v9.9zm0-12c-.6-.4-1.6-.7-2.4-.7-3.7 0-7.3 2.1-7.3 8.3 0 5.8 3.6 7.7 5.9 7.7 1.9 0 3.2-.8 3.8-1.7h.2v1.6h.4l6-.7v-1.1l-1.6-.9V.3h-.4l-6.3 1v1.4l1.7.8v3.7z',
        class: 'guardian-titlepiece-0',
      },
      {
        d: 'M90.9 7.4v1.4l1.7.8v10.3l-1.6.8v1.4h8.8v-1.4l-2.1-.8v-8.1c.9-.7 2-.9 3.4-.9.4 0 1 .1 1.3.1V6.6c-.2-.1-.5-.1-.8-.1-1.7 0-3.2 1.1-4.1 3.1V6.4H97l-6.1 1zM80 8.6c.4-.2 1.1-.2 1.3-.2 2 0 2.5 1 2.5 2.9V13l-2.8.7c-3 .5-5.2 1.4-5.2 4.6 0 2.5 1.8 4.3 4.2 4.3 1.9 0 3.7-.8 4.4-2.2h.1c.2 1.6 1.7 2.1 3.2 2.1 1.2 0 2.4-.4 2.9-.9v-.9L89 20v-8.8c0-3.4-2.4-4.7-6.5-4.7-2.7 0-4.4.7-5.8 1.3v3.9H79l1-3.1zm3.9 10.5c-.3.4-.8.7-1.4.7-1 0-1.9-.5-1.9-2.2 0-1.2 1.1-2.3 2.3-2.5l1-.2v4.2zM131.4 8.6c.4-.2 1.1-.2 1.3-.2 2 0 2.5 1 2.5 2.9V13l-2.9.5c-3 .5-5.2 1.4-5.2 4.6 0 2.5 1.8 4.3 4.2 4.3 1.9 0 3.7-.8 4.4-2.2h.1c.2 1.6 1.7 2.1 3.2 2.1 1.2 0 2.4-.4 2.9-.9v-.9l-1.6-.8v-8.8c0-3.4-2.4-4.7-6.5-4.7-2.7 0-4.4.7-5.8 1.3v3.9h2.4l1-2.8zm3.9 10.5c-.3.4-.8.7-1.4.7-1 0-1.9-.5-1.9-2.2 0-1.2 1.1-2.3 2.3-2.5l1-.2v4.2z',
        class: 'guardian-titlepiece-0',
      },
      {
        d: 'M60.2 17.7c0 2.6 1.3 4.8 4.4 4.8 2 0 3.8-.9 4.8-2.1v2.1h.4l6.2-.7v-1.1l-1.7-.9V6.5h-.4l-6.3 1v1.4l1.7.8v9.1c-.6.4-1 .5-1.8.5-1.3 0-2.1-.4-2.1-2.1V6.5H65l-6.3 1v1.4l1.7.8-.2 8zM53.7 18.8h-5.4c-.6 0-1.1-.4-1.1-1 0-.4.3-.8.7-1.1.8.2 1.5.3 2.5.3 3.9 0 6.6-1.8 6.6-5.1 0-1.5-.6-2.3-1.6-3.2l2.6.8v-3l-4.1.8c-1-.4-2.3-.8-3.5-.8-3.9 0-6.6 2-6.6 5.3 0 2 1 3.5 2.5 4.3l.1.1c-.9.6-2.7 2-2.7 3.6 0 1.2.8 2.4 2.4 2.7-1.7.4-3.6 1.1-3.6 3.1s2.9 4.1 7.7 4.1c6 0 8.5-2.8 8.5-6.4.1-3.2-1.6-4.5-5-4.5M50.4 8.2c1.1 0 1.9.8 1.9 3.5 0 2.8-.8 3.4-1.9 3.4-1.1 0-1.9-.6-1.9-3.4.1-2.9.8-3.5 1.9-3.5m0 19c-2.8 0-3.8-1.1-3.7-2.1 0-.7.4-1.7 1.7-1.8h4.3c1.3 0 2 .9 2 1.7 0 1.6-1.2 2.2-4.3 2.2',
        class: 'guardian-titlepiece-0',
      },
      {
        d: 'M42.2 15c0-6.4-2.8-8.5-6.8-8.5-4.5 0-7.5 3-7.5 8 0 5.2 2.7 8 7.9 8 2.8 0 5-1.5 5.7-2.5l.1-1.2c-1.1.3-2.1.5-4.1.5-2.8 0-4.4-1.4-4.4-4.4l9.1.1zm-6.8-6.8c1.3 0 1.9.9 1.9 4.7l-4.2.2c0-3.8.9-4.9 2.3-4.9',
        class: 'guardian-titlepiece-1',
      },
      {
        d: 'M11.4 22.1h8.3v-1.4l-1.5-.7v-9.8c.6-.4 1.3-.6 2.1-.6 1.4 0 2.1.9 2 2.2V20l-1.6.8v1.4H29v-1.4l-1.7-.8v-9.4c0-2.8-1.6-4.1-3.8-4.1-2.1 0-4.1.7-5.4 2V0h-.4l-6.3 1v1.3l1.7.8V20l-1.7.8v1.3zM2.3 17.9c0 2.8 1.3 4.6 4.3 4.6 1.6 0 3.3-.4 4.2-1.1v-1.9c-.4.1-1.1.2-1.6.2-1.5 0-1.9-.8-1.9-2.3v-8h3.3V6.9H7.4V3.3L2.3 4v2.9L0 7.3v2.2h2.3v8.4z',
        class: 'guardian-titlepiece-1',
      },
    ],
  },
  lock: {
    viewBox: '0 0 9 10.57',
    paths: [
      {
        d: 'M8.17 3.68C8.17 1.65 6.52 0 4.5 0S.83 1.65.83 3.68H0V9.3l1.28 1.28h6.45L9 9.3V3.68h-.83zM4.5 1.57c1.12 0 2.1.9 2.1 2.1H2.4c0-1.12.98-2.1 2.1-2.1z',
        class: null,
      },
    ],
  },
  'paypal-logo': {
    viewBox: '',
    paths: []
  },
  'mastercard-logo': {
    viewBox: '0 0 27 21',
    paths: [
      {
        d: 'M5.44277717,20.8859397 L5.44277717,19.5946915 C5.46241102,19.3776066 5.38087933,19.1631983 5.21933376,19.0070903 C5.05778819,18.8509823 4.83214965,18.7685597 4.60095525,18.7812052 C4.29311391,18.762682 3.99882897,18.902758 3.83233523,19.1470588 C3.68049664,18.910048 3.40336616,18.7697885 3.1094664,18.7812052 C2.84903913,18.7666833 2.59938291,18.8808565 2.45064924,19.0824964 L2.45064924,18.830703 L2,18.830703 L2,20.8902439 L2.44378656,20.8902439 L2.44378656,19.7065997 C2.42740009,19.5620131 2.4794193,19.4179614 2.58603428,19.3126871 C2.69264925,19.2074127 2.84307465,19.1515654 2.99737598,19.1599713 C3.3130592,19.1599713 3.49148885,19.3536585 3.49148885,19.7022955 L3.49148885,20.8880918 L3.93527541,20.8880918 L3.93527541,19.7065997 C3.91969835,19.5621871 3.97198959,19.4185829 4.07841991,19.3134909 C4.18485023,19.2083988 4.33478735,19.1523175 4.48886483,19.1599713 C4.81369829,19.1599713 4.98755282,19.3536585 4.98755282,19.7022955 L4.98755282,20.8880918 L5.44277717,20.8859397 Z M12.5708128,18.830703 L11.7747421,18.830703 L11.7747421,18.2065997 L11.328668,18.2065997 L11.328668,18.830703 L10.8711561,18.830703 L10.8711561,19.205165 L11.328668,19.205165 L11.328668,20.1800574 C11.328668,20.6578192 11.5070976,20.9418938 12.0698373,20.9418938 C12.2800603,20.9424416 12.4861928,20.8872477 12.6646028,20.7826399 L12.5273492,20.4167862 C12.3997499,20.488388 12.2549308,20.5283721 12.1064382,20.5329985 C11.8776823,20.5329985 11.7724545,20.3952654 11.7724545,20.1886657 L11.7724545,19.2008608 L12.5685253,19.2008608 L12.5708128,18.830703 Z M16.6335187,18.7790531 C16.3928119,18.774381 16.1671062,18.8887171 16.0387532,19.0803443 L16.0387532,18.830703 L15.6041168,18.830703 L15.6041168,20.8902439 L16.0433283,20.8902439 L16.0433283,19.7281205 C16.0433283,19.3880918 16.2171828,19.1685796 16.5282909,19.1685796 C16.6300608,19.16727 16.7311094,19.1848203 16.8256737,19.2202295 L16.9720775,18.830703 C16.863412,18.7941314 16.7489272,18.7752103 16.6335187,18.7747489 L16.6335187,18.7790531 Z M10.4914212,18.9942611 C10.2220399,18.8437232 9.91241435,18.769034 9.59927294,18.7790531 C9.04568352,18.7790531 8.7071247,19.0243902 8.7071247,19.4246772 C8.7071247,19.7604017 8.95418113,19.9626973 9.44371889,20.0272597 L9.67247484,20.0573888 C9.93325664,20.0918221 10.0750853,20.1779053 10.0750853,20.2941176 C10.0750853,20.4533716 9.88293033,20.5566714 9.55809686,20.5566714 C9.29658726,20.5653308 9.03982822,20.4893708 8.83065292,20.3414634 L8.60189696,20.6642754 C8.88069789,20.8431308 9.21154065,20.9363551 9.54894663,20.9311334 C10.1803131,20.9311334 10.5303097,20.6556671 10.5303097,20.2639885 C10.5303097,19.8723099 10.2626652,19.7238163 9.78914038,19.6592539 L9.56038442,19.6291248 C9.35450406,19.6032998 9.17149929,19.5430416 9.17149929,19.4139168 C9.17149929,19.284792 9.34535382,19.1599713 9.60613562,19.1599713 C9.84715592,19.1627012 10.0834174,19.2234547 10.2924035,19.3364419 L10.4914212,18.9942611 Z M17.125344,19.8550932 C17.110109,20.1446332 17.2257138,20.4267351 17.4436046,20.6317215 C17.6614955,20.8367079 17.9613564,20.9454661 18.2691238,20.9311334 C18.5548122,20.9448077 18.835577,20.857274 19.0560443,20.6857962 L18.8272883,20.3629842 C18.6627283,20.4808483 18.4622074,20.5457422 18.2553984,20.5480631 C17.8729815,20.5134311 17.5811105,20.2111446 17.5811105,19.849713 C17.5811105,19.4882815 17.8729815,19.185995 18.2553984,19.151363 C18.4622074,19.1536839 18.6627283,19.2185778 18.8272883,19.3364419 L19.0560443,19.0136298 C18.835577,18.8421521 18.5548122,18.7546184 18.2691238,18.7682927 C17.9613564,18.75396 17.6614955,18.8627182 17.4436046,19.0677045 C17.2257138,19.2726909 17.110109,19.5547928 17.125344,19.8443328 L17.125344,19.8550932 Z M14.0462888,18.7790531 C13.4057721,18.7790531 12.9642731,19.2094691 12.9642731,19.8550932 C12.9453515,20.1406545 13.0555935,20.4204388 13.267793,20.6254 C13.4799926,20.8303612 13.7743835,20.9414071 14.0783146,20.9311334 C14.4047015,20.9417297 14.7238433,20.8390964 14.975038,20.6427546 L14.746282,20.3371592 C14.5655613,20.4733009 14.3418331,20.5490124 14.1103404,20.5523673 C13.7782259,20.5638179 13.4915898,20.3352132 13.4492357,20.0251076 L15.0848408,20.0251076 C15.0848408,19.9691535 15.0848408,19.9131994 15.0848408,19.8529412 C15.0848408,19.2073171 14.668505,18.776901 14.0531514,18.776901 L14.0462888,18.7790531 Z M14.0462888,19.1621234 C14.1966773,19.157478 14.3426892,19.2101519 14.4512188,19.3082023 C14.5597484,19.4062526 14.6216015,19.5413729 14.6227538,19.6829268 L13.4492357,19.6829268 C13.4664848,19.3837009 13.7347916,19.1523191 14.0531514,19.1621234 L14.0462888,19.1621234 Z M8.11922189,19.8572453 L8.11922189,18.830703 L7.68001045,18.830703 L7.68001045,19.0803443 C7.50749797,18.8801576 7.24456872,18.7684478 6.97086698,18.7790531 C6.33601638,18.7790531 5.82136828,19.2632215 5.82136828,19.8604734 C5.82136828,20.4577254 6.33601638,20.9418938 6.97086698,20.9418938 C7.24456872,20.9524991 7.50749797,20.8407893 7.68001045,20.6406026 L7.68001045,20.8902439 L8.11922189,20.8902439 L8.11922189,19.8572453 Z M6.34636321,19.8572453 C6.33100745,19.6772567 6.39647287,19.4994432 6.52687484,19.3669499 C6.65727681,19.2344566 6.84069738,19.1593925 7.03263108,19.1599713 C7.41504801,19.1946033 7.70691902,19.4968898 7.70691902,19.8583214 C7.70691902,20.2197529 7.41504801,20.5220394 7.03263108,20.5566714 C6.84069738,20.5572502 6.65727681,20.4821862 6.52687484,20.3496928 C6.39647287,20.2171995 6.33100745,20.0393861 6.34636321,19.8593974 L6.34636321,19.8572453 Z M23.249141,18.7812052 C23.0084342,18.7765331 22.7827285,18.8908692 22.6543755,19.0824964 L22.6543755,18.830703 L22.2197392,18.830703 L22.2197392,20.8902439 L22.6589506,20.8902439 L22.6589506,19.7281205 C22.6589506,19.3880918 22.8328051,19.1685796 23.1439132,19.1685796 C23.2456831,19.16727 23.3467317,19.1848203 23.441296,19.2202295 L23.5876998,18.8328551 C23.4790343,18.7962835 23.3645495,18.7773624 23.249141,18.776901 L23.249141,18.7812052 Z M26.7765579,20.5932568 C26.8062991,20.592914 26.8358259,20.598031 26.8634851,20.6083213 C26.8897561,20.6184069 26.9138033,20.6330024 26.9343995,20.651363 C26.9545001,20.6699185 26.970786,20.6918062 26.9824382,20.7159254 C27.0058539,20.7667246 27.0058539,20.82438 26.9824382,20.8751793 C26.970786,20.8992985 26.9545001,20.9211862 26.9343995,20.9397417 C26.9138033,20.9581023 26.8897561,20.9726978 26.8634851,20.9827833 C26.836099,20.9941517 26.8064915,21.0000157 26.7765579,21 C26.6880407,20.9993723 26.6078532,20.9507565 26.5706775,20.8751793 C26.5475329,20.8243274 26.5475329,20.7667773 26.5706775,20.7159254 C26.5823297,20.6918062 26.5986156,20.6699185 26.6187162,20.651363 C26.6393124,20.6330024 26.6633596,20.6184069 26.6896306,20.6083213 C26.7168083,20.59581 26.7463544,20.5884952 26.7765579,20.5868005 L26.7765579,20.5932568 Z M26.7765579,20.9569584 C26.7993899,20.9570888 26.8219946,20.952689 26.8428971,20.9440459 C26.8625518,20.9357349 26.8803928,20.9240587 26.8955109,20.9096126 C26.9548267,20.8487287 26.9548267,20.7552885 26.8955109,20.6944046 C26.8804637,20.6798795 26.8626057,20.6681923 26.8428971,20.6599713 C26.8219946,20.6513282 26.7993899,20.6469283 26.7765579,20.6470588 C26.7537458,20.6471138 26.731181,20.6515059 26.7102186,20.6599713 C26.689666,20.6678995 26.6710012,20.6796058 26.6553172,20.6944046 C26.5960015,20.7552885 26.5960015,20.8487287 26.6553172,20.9096126 C26.6710771,20.9243241 26.6897224,20.9360181 26.7102186,20.9440459 C26.7315017,20.9510427 26.7540561,20.9539694 26.7765579,20.9526542 L26.7765579,20.9569584 Z M26.7902832,20.7008608 C26.8116379,20.6998865 26.832681,20.7059779 26.8497598,20.7180774 C26.8639661,20.7291383 26.8716315,20.7459649 26.8703478,20.7632711 C26.8710119,20.7777235 26.8652032,20.7917754 26.8543349,20.8020086 C26.8410757,20.8133384 26.8241612,20.8201582 26.8062961,20.8213773 L26.8726354,20.892396 L26.8200215,20.892396 L26.7582574,20.8213773 L26.7376693,20.8213773 L26.7376693,20.892396 L26.6942057,20.892396 L26.6942057,20.7030129 L26.7902832,20.7008608 Z M26.7399569,20.7374462 L26.7399569,20.7890961 L26.7902832,20.7890961 C26.7992387,20.791608 26.8087785,20.791608 26.8177339,20.7890961 C26.8209966,20.7830047 26.8209966,20.7758188 26.8177339,20.7697274 C26.8209966,20.763636 26.8209966,20.7564501 26.8177339,20.7503587 C26.8087605,20.7479656 26.7992567,20.7479656 26.7902832,20.7503587 L26.7399569,20.7374462 Z M21.5632096,19.8615495 L21.5632096,18.830703 L21.1239981,18.830703 L21.1239981,19.0803443 C20.9514856,18.8801576 20.6885564,18.7684478 20.4148546,18.7790531 C19.7800041,18.7790531 19.265356,19.2632215 19.265356,19.8604734 C19.265356,20.4577254 19.7800041,20.9418938 20.4148546,20.9418938 C20.6885564,20.9524991 20.9514856,20.8407893 21.1239981,20.6406026 L21.1239981,20.8902439 L21.5632096,20.8902439 L21.5632096,19.8615495 Z M19.7903509,19.8615495 C19.7749951,19.6815608 19.8404605,19.5037474 19.9708625,19.371254 C20.1012645,19.2387607 20.2846851,19.1636966 20.4766188,19.1642755 C20.8590357,19.1989075 21.1509067,19.501194 21.1509067,19.8626255 C21.1509067,20.2240571 20.8590357,20.5263436 20.4766188,20.5609756 C20.2846851,20.5615544 20.1012645,20.4864903 19.9708625,20.353997 C19.8404605,20.2215037 19.7749951,20.0436902 19.7903509,19.8637016 L19.7903509,19.8615495 Z M25.9827747,19.8615495 L25.9827747,18 L25.5435632,18 L25.5435632,19.0760402 C25.3710508,18.8758534 25.1081215,18.7641436 24.8344198,18.7747489 C24.1995692,18.7747489 23.6849211,19.2589173 23.6849211,19.8561693 C23.6849211,20.4534213 24.1995692,20.9375896 24.8344198,20.9375896 C25.1081215,20.9481949 25.3710508,20.8364851 25.5435632,20.6362984 L25.5435632,20.8859397 L25.9827747,20.8859397 L25.9827747,19.8615495 Z M24.209916,19.8615495 C24.1945602,19.6815608 24.2600257,19.5037474 24.3904276,19.371254 C24.5208296,19.2387607 24.7042502,19.1636966 24.8961839,19.1642755 C25.2616855,19.2172072 25.5307467,19.5141383 25.5284533,19.8620369 C25.52616,20.2099354 25.253205,20.5037043 24.8870336,20.5523673 C24.6955304,20.5528976 24.5125022,20.478125 24.3821764,20.3461178 C24.2518506,20.2141105 24.1860829,20.0368774 24.2007658,19.8572453 L24.209916,19.8615495 Z',
        class: null,
      },
      {
        d: 'M10.3904237,8.48835616 C10.3884324,5.91623322 11.5485884,3.4860197 13.5366102,1.89794521 C10.1592741,-0.803412599 5.30928396,-0.409936474 2.39508257,2.80184913 C-0.519118824,6.01363474 -0.519118824,10.9654064 2.39508257,14.177192 C5.30928396,17.3889776 10.1592741,17.7824537 13.5366102,15.0810959 C11.5479558,13.4925171 10.3877289,11.0612963 10.3904237,8.48835616 Z',
        class: null,
      },
      {
        d: 'M26.0847458,13.7078082 L26.0847458,13.4178082 L26.1922881,13.4178082 L26.1922881,13.3578082 L25.92,13.3578082 L25.92,13.4178082 L26.0275424,13.4178082 L26.0275424,13.7078082 L26.0847458,13.7078082 Z M26.6133051,13.7078082 L26.6133051,13.3578082 L26.5309322,13.3578082 L26.4348305,13.6078082 L26.3387288,13.3578082 L26.2563559,13.3578082 L26.2563559,13.7078082 L26.3135593,13.7078082 L26.3135593,13.4428082 L26.4027966,13.6703082 L26.4645763,13.6703082 L26.5538136,13.4428082 L26.5538136,13.7078082 L26.6133051,13.7078082 Z',
        class: null,
      },
      {
        d: 'M26.865,8.48835616 C26.8649265,11.6981845 25.0641048,14.6262062 22.2273508,16.0288794 C19.3905968,17.4315526 16.01594,17.0626193 13.5366102,15.0787671 C15.5237645,13.4893444 16.6840078,11.059454 16.6840078,8.48719178 C16.6840078,5.91492958 15.5237645,3.48503916 13.5366102,1.89561644 C16.01594,-0.0882357812 19.3905968,-0.457168989 22.2273508,0.945504164 C25.0641048,2.34817732 26.8649265,5.27619909 26.865,8.4860274 L26.865,8.48835616 Z',
        class: null,
      },
    ],
  },
  twitter: {
    viewBox: '0 0 16 16',
    paths: [
      {
        d: 'M13.553 5.05v.399c0 3.746-2.79 8.051-7.892 8.051-1.594 0-3.029-.478-4.224-1.275.239 0 .478.08.638.08 1.275 0 2.471-.478 3.428-1.196-1.196 0-2.232-.797-2.631-1.913.159 0 .319.08.558.08l.718-.08c-1.275-.239-2.232-1.434-2.232-2.79.399.239.797.319 1.275.319-.718-.478-1.275-1.355-1.275-2.312 0-.478.159-1.037.399-1.434 1.355 1.674 3.428 2.87 5.74 2.95-.08-.239-.08-.399-.08-.638 0-1.594 1.275-2.79 2.79-2.79.797 0 1.514.319 1.993.877.638-.08 1.196-.319 1.753-.638-.239.638-.638 1.196-1.196 1.514.558-.08 1.116-.239 1.594-.399-.319.319-.797.797-1.355 1.196l-.001-.001z',
        class: null,
      },
    ],
  },
  user: {
    viewBox: '0 0 20 20',
    paths: [
      {
        d: 'M10 8.3c1.55 0 3.4-1.75 3.4-3.9S12.15 1 10 1 6.6 2.25 6.6 4.4s2 3.9 3.4 3.9zm5.86 3.4l-.86-.82c-1.67-.58-3.14-.88-5-.88-1.87 0-3.32.3-5 .86l-.86.85L2 18.16l.86.84h14.28l.86-.86-2.14-6.42v-.02z',
        class: null,
      },
    ],
  },
  video: {
    viewBox: '0 0 20 12.728',
    paths: [
      {
        d: 'M0 1.818v9.091l1.818 1.819h10.682v-12.728h-10.682zM18.75.165l-5 5v2.5l5 5.001h1.25v-12.501z',
        class: null,
      },
    ],
  },
  'paypal-p-logo': {
    viewBox: '0 0 20 23',
    paths: [
      {
        d: 'M.555 20.444c-.58-.166-.503-.638-.439-1.035.239-1.578.497-3.156.749-4.727.713-4.477 1.432-8.96 2.154-13.449C3.174.287 3.471 0 4.42 0c2.8 0 5.6 0 8.387.096.976.065 1.93.312 2.813.728a4.171 4.171 0 0 1 2.246 4.926 15.908 15.908 0 0 0-2.736-.581c-2.18-.083-4.368 0-6.548 0-.749 0-1.026.242-1.142.977-.331 2.032-.658 4.066-.98 6.102-.059.357-.072.715-.104 1.073-.052.236-.11.473-.149.709-.316 1.955-.645 3.904-.935 5.865-.065.434-.252.569-.677.562-1.368-.013-2.697-.013-4.04-.013z',
        class: 'paypal-p-logo-0',
      },
      {
        d: 'M.555 20.444c1.348 0 2.69-.038 4.039 0 .425 0 .612-.127.677-.562.297-1.955.645-3.91.935-5.865.04-.236.097-.473.149-.709a1.23 1.23 0 0 1 1.168-.53h2.516a8.516 8.516 0 0 0 4.89-1.527c1.82-1.348 2.58-3.278 2.955-5.412 1.632.901 2.097 2.377 1.897 4.077a10.972 10.972 0 0 1-.742 2.92c-.955 2.293-2.845 3.398-5.265 3.698-.606.077-1.22.084-1.832.103-.73 0-1 .223-1.123.932-.245 1.432-.464 2.875-.69 4.313-.142.907-.361 1.099-1.29 1.099h-3.31c-.542 0-.742-.25-.645-.754.097-.505.168-1.067.264-1.693H2.806c-.748 0-1.516-.038-2.251-.09z',
        class: 'paypal-p-logo-1',
      },
      {
        d: 'M17.877 5.859c-.36 2.133-1.135 4.057-2.954 5.411a8.516 8.516 0 0 1-4.89 1.508c-.84.032-1.678 0-2.517 0a1.23 1.23 0 0 0-1.168.505c.033-.358.046-.722.104-1.074.322-2.036.65-4.07.98-6.101.123-.735.394-.971 1.142-.978 2.18 0 4.368-.057 6.549 0 .93.126 1.848.333 2.742.62a.272.272 0 0 1 .012.109z',
        class: 'paypal-p-logo-2',
      },
    ],
  },
  'visa-logo': {
    viewBox: '0 0 32 20',
    paths: [
      {
        d: 'M15.3783358,5.65884676 L13.7081346,14.3633059 L11.6879574,14.3633059 L13.358465,5.65884676 L15.3783358,5.65884676 Z M23.877208,11.2794463 L24.9406205,8.01080921 L25.5523125,11.2794463 L23.877208,11.2794463 Z M26.1319796,14.3633059 L28,14.3633059 L26.3681062,5.65884676 L24.6448877,5.65884676 C24.256451,5.65884676 23.9293061,5.91008224 23.7845042,6.29715316 L20.7530125,14.3633059 L22.8746277,14.3633059 L23.2957022,13.0635101 L25.8871189,13.0635101 L26.1319796,14.3633059 Z M20.8584344,11.5215803 C20.8674749,9.22457021 18.0095922,9.09714934 18.0287458,8.07091339 C18.0350283,7.75888683 18.3016475,7.42642485 18.8852986,7.34159209 C19.174749,7.30003435 19.9729213,7.26654773 20.877588,7.73123891 L21.2315481,5.88449503 C20.7456575,5.68872713 20.1201748,5.5 19.3419224,5.5 C17.3448827,5.5 15.940075,6.68250682 15.928736,8.37710126 C15.9158648,9.63035929 16.9325423,10.3291133 17.6965444,10.7462363 C18.484297,11.1726326 18.7481582,11.4468794 18.7446339,11.8277681 C18.7392709,12.411809 18.1160866,12.6704287 17.5364196,12.6802171 C16.5200485,12.6979049 15.9311877,12.3740293 15.4615394,12.1300063 L15.0948613,14.0382282 C15.5677274,14.2793318 16.4389902,14.4891812 17.3407456,14.5 C19.4637398,14.5 20.852152,13.331403 20.8584344,11.5215803 L20.8584344,11.5215803 Z M12.4917992,5.65884676 L9.21866457,14.3633059 L7.08356522,14.3633059 L5.47266386,7.41663646 C5.37505669,6.98938159 5.29001434,6.83242382 4.99320887,6.65193955 C4.50731824,6.35777252 3.70531522,6.08283883 3,5.9117995 L3.04780759,5.65884676 L6.48535739,5.65884676 C6.92313397,5.65884676 7.31708692,5.98392452 7.41729899,6.54598447 L8.26818221,11.5834017 L10.3695711,5.65884676 L12.4917992,5.65884676 L12.4917992,5.65884676 Z',
        class: null,
      },
    ],
  },
};


// ----- Types ----- //

// Utility type: https://flow.org/en/docs/types/utilities/#toc-keys
export type SvgName = $Keys<typeof svgsCatalog>;

type PropTypes = {
  svgName: SvgName,
};


// ----- Component ----- //

const Svg = (props: PropTypes) => {

  const svgClass = `svg-${props.svgName}`;

  const paths = svgsCatalog[props.svgName].paths.map(path =>
    <path d={path.d} className={path.class} />,
  );

  return (
    <svg
      className={svgClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={svgsCatalog[props.svgName].viewBox}
      preserveAspectRatio="xMinYMid"
    >
      {paths}
    </svg>
  );

};


// ----- Exports ----- //

export default Svg;
