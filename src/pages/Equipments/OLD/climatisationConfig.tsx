import * as Yup from 'yup';

import { useEquipments } from '../../../context/EquipmentProvider';

import {
  brandIds,
  equipment_model,
  serial_number,
  remote_control_number,
  gas_type_id,
  gas_weight,
  has_leak_detection,
  leak_detection_periodicity,
  installation_date,
  nfc_tag_id,
} from '../equipmentConfigs/equipmentConfigSharedFields';

import parametrageConfComp from '../equipmentConfigs/parametrageConfComp';

const climatisationConfig = () => {
  const { equipmentLocations, equipmentBrands, gas_types } = useEquipments();

  const parametrageStart = parametrageConfComp();

  return {
    1: parametrageStart,
    2: {
      location_id: {
        label: 'Emplacement',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: [{ value: '', label: ' choissisez' }, ...equipmentLocations],
      },
      precisionCheck: {
        label: 'Précision',
        initialValue: false,
        validationSchema: Yup.boolean(),
        type: 'checkbox',
      },

      precision: {
        label: 'Preicsez',
        initialValue: '',
        validationSchema: Yup.string().notRequired(),
        type: 'text',
        visibleWhen: (values: Record<string, any>) =>
          values.precisionCheck === true,
      },
      nfc_tag_id,
      equipment_brand_id: {
        ...brandIds,
        options: [{ value: '', label: ' choissisez' }, ...equipmentBrands],
      },
      equipment_model,
      serial_number,
      remote_control_number,
      installation_date,
    },
    3: {
      nfc_tag_id,
      equipment_brand_id: {
        ...brandIds,
        options: [{ value: '', label: ' choissisez' }, ...equipmentBrands],
      },
      unite_exterieur_type_id: {
        label: 'Type',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: [
          { value: '', label: ' Choissisez' },
          { value: 1, label: 'MONO-SPLIT' },
          { value: 2, label: 'BI-SPLIT' },
          { value: 3, label: 'TRI-SPLIT' },
          { value: 4, label: 'QUADRI-SPLIT' },
          { value: 5, label: '5 POSTES' },
          { value: 6, label: 'DRV / VRV' },
          { value: 7, label: 'GROUPE A EAU GLACEE (CHILLER)' },
          { value: 8, label: 'GROUPE A E' },
        ],
      },
      equipment_model,
      serial_number,
      gas_type_id: {
        ...gas_type_id,
        options: [{ value: '', label: ' choissisez' }, ...gas_types],
      },
      gas_weight,
      has_leak_detection,
      leak_detection_periodicity,
      installation_date,
    },
  };
};

export default climatisationConfig;
