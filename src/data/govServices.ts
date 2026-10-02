import { GovService } from '../types';

export const OFFICIAL_GOV_SERVICES: GovService[] = [
  {
    id: 'mywelfare',
    label: 'PPS Number & Social Welfare (MyWelfare)',
    irishLabel: 'Uimhir PSP agus Leas Sóisialach',
    category: 'Identity',
    agency: 'Department of Social Protection',
    href: 'https://services.mywelfare.ie',
    description: 'Book appointments, apply for PPSN, manage child benefit, and jobseeker payments.'
  },
  {
    id: 'revenue-myaccount',
    label: 'Taxes & PAYE (Revenue myAccount)',
    irishLabel: 'MoChuntas na gCoimisinéirí Ioncaim',
    category: 'Tax',
    agency: 'Revenue Commissioners',
    href: 'https://www.revenue.ie/en/online-services/services/myaccount/index.aspx',
    description: 'Add new employment, stop emergency tax, claim tax credits and health expense refunds.'
  },
  {
    id: 'isd-portal',
    label: 'Immigration & IRP Renewals (ISD Online)',
    irishLabel: 'Seirbhísí Eadóirseachta agus Inimirce',
    category: 'Immigration',
    agency: 'Immigration Service Delivery (ISD)',
    href: 'https://inisonline.jahs.ie',
    description: 'Renew Irish Residence Permit (IRP) cards online and track visa applications.'
  },
  {
    id: 'epos-dete',
    label: 'Work Permits (EPOS Online)',
    irishLabel: 'Ceadanna Fostaíochta',
    category: 'Employment',
    agency: 'Department of Enterprise, Trade and Employment',
    href: 'https://epos.enterprise.gov.ie',
    description: 'Apply for Critical Skills (CSEP) and General Employment Permits.'
  },
  {
    id: 'citizens-info',
    label: 'Citizens Information Portal',
    irishLabel: 'Faisnéis do Shaoránaigh',
    category: 'Civic Guide',
    agency: 'Citizens Information Board',
    href: 'https://www.citizensinformation.ie',
    description: 'Plain-English guide to public services, statutory rights, and Irish legislation.'
  },
  {
    id: 'rtb-portal',
    label: 'Tenancy & Rental Rights (RTB)',
    irishLabel: 'An Bord Um Thionóntachtaí Cónaithe',
    category: 'Housing',
    agency: 'Residential Tenancies Board',
    href: 'https://www.rtb.ie',
    description: 'Verify registered tenancies, rent pressure zones (RPZ), and resolve deposit disputes.'
  },
  {
    id: 'ndls',
    label: 'Driving Licence & Theory Test (NDLS)',
    irishLabel: 'An tSeirbhís Náisiúnta um Cheadúnais Tiomána',
    category: 'Transport',
    agency: 'Road Safety Authority',
    href: 'https://www.ndls.ie',
    description: 'Exchange foreign driving licences, book theory tests, and renew learner permits.'
  },
  {
    id: 'irish-statute',
    label: 'Irish Statute Book (Primary Law)',
    irishLabel: 'Leabhar Reachtanna na hÉireann',
    category: 'Legislation',
    agency: 'Office of the Attorney General',
    href: 'https://www.irishstatutebook.ie',
    description: 'Search official Acts of the Oireachtas and Statutory Instruments.'
  }
];
