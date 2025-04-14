import DateRangeIcon from "@mui/icons-material/DateRange";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InventoryIcon from "@mui/icons-material/Inventory";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

import AltRouteIcon from "@mui/icons-material/AltRoute";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import SpaIcon from "@mui/icons-material/Spa";
import SupportIcon from "@mui/icons-material/Support";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const verificationPaneldata = {
  scenario1: [
    {
      icon: FingerprintIcon,
      label: "Verification",
      value: "Password",
    },
    {
      icon: SupportIcon,
      label: "Indicators",
      value: "015 / 016",
    },
    {
      icon: DragIndicatorIcon,
      label: "SMS Reg",
      value: "No ",
    },
    {
      icon: RecordVoiceOverIcon,
      label: "Tone Used",
      value: "Registered",
    },
  ],
  scenario2: [
    {
      icon: FingerprintIcon,
      label: "Verification",
      value: "Not Verified",
    },
    {
      icon: SupportIcon,
      label: "Indicators",
      value: "No",
    },
    {
      icon: DragIndicatorIcon,
      label: "SMS Reg",
      value: "No",
    },
    {
      icon: RecordVoiceOverIcon,
      label: "Tone Used",
      value: "Eligible",
    },
  ],
  scenario3: [
    {
      icon: FingerprintIcon,
      label: "Verification",
      value: "Voice High",
    },
    {
      icon: SupportIcon,
      label: "Indicators",
      value: "002",
    },
    {
      icon: DragIndicatorIcon,
      label: "SMS Reg",
      value: "Yes",
    },
    {
      icon: RecordVoiceOverIcon,
      label: "Tone Used",
      value: "In use",
    },
  ],
  scenario4: [
    {
      icon: FingerprintIcon,
      label: "Verification",
      value: "Not Identified",
    },
    {
      icon: SupportIcon,
      label: "Indicators",
      value: "No",
    },
    {
      icon: DragIndicatorIcon,
      label: "SMS Reg",
      value: "No ",
    },
    {
      icon: RecordVoiceOverIcon,
      label: "Tone Used",
      value: "Not Eligible",
    },
  ],
  scenario5: [
    {
      icon: FingerprintIcon,
      label: "Verification",
      value: "SMS",
    },
    {
      icon: SupportIcon,
      label: "Indicators",
      value: "No",
    },
    {
      icon: DragIndicatorIcon,
      label: "SMS Reg",
      value: "Yes ",
    },
    {
      icon: RecordVoiceOverIcon,
      label: "Tone Used",
      value: "Not Eligible",
    },
  ],
};
const productsPaneldata = {
  scenario1: [
    {
      icon: AccountBalanceIcon,
      label: "Balance",
      value: "£ 1134.66",
    },
    {
      icon: BadgeIcon,
      label: "Product Type",
      value: "Current Account",
    },
    {
      icon: SpaIcon,
      label: "CUR",
      value: "Holder of the Product",
    },

    {
      icon: AccountBalanceWalletIcon,
      label: "Account Type",
      value: "Joint",
    },
  ],
  scenario2: [
    {
      icon: AccountBalanceIcon,
      label: "Balance",
      value: "N/A",
    },
    {
      icon: BadgeIcon,
      label: "Product Type",
      value: "Credit Card Saver",
    },
    {
      icon: SpaIcon,
      label: "CUR",
      value: "Authorised Card Holder",
    },

    {
      icon: AccountBalanceWalletIcon,
      label: "Account Type",
      value: "Card",
    },
  ],
  scenario3: [
    {
      icon: AccountBalanceIcon,
      label: "Balance",
      value: "£ 177256.88",
    },
    {
      icon: BadgeIcon,
      label: "Product Type",
      value: "Current Account",
    },
    {
      icon: SpaIcon,
      label: "CUR",
      value: "Holder of the Product",
    },

    {
      icon: AccountBalanceWalletIcon,
      label: "Account Type",
      value: "Sole",
    },
  ],
  scenario4: [
    {
      icon: AccountBalanceIcon,
      label: "Balance",
      value: "N/A",
    },
    {
      icon: BadgeIcon,
      label: "Product Type",
      value: "N/A",
    },
    {
      icon: SpaIcon,
      label: "CUR",
      value: "N/A",
    },

    {
      icon: AccountBalanceWalletIcon,
      label: "Account Type",
      value: "N/A",
    },
  ],
  scenario5: [
    {
      icon: AccountBalanceIcon,
      label: "Balance",
      value: "£ 22765.02",
    },
    {
      icon: BadgeIcon,
      label: "Product Type",
      value: "Savings Account",
    },
    {
      icon: SpaIcon,
      label: "CUR",
      value: "Power of Attorney",
    },

    {
      icon: AccountBalanceWalletIcon,
      label: "Account Type",
      value: "Joint",
    },
  ],
};
const idPaneldata = {
  scenario1: [
    {
      icon: BadgeIcon,
      label: "Name",
      value: "John Smith",
    },
    {
      icon: DateRangeIcon,
      label: "DOB",
      value: "13-05-1994",
    },
    {
      icon: PermIdentityIcon,
      label: "IdType",
      value: "Account Number",
    },
    {
      icon: InventoryIcon,
      label: "Product",
      value: "77-00-11 89765671",
    },
  ],
  scenario2: [
    {
      icon: BadgeIcon,
      label: "Name",
      value: "Mark Lennan",
    },
    {
      icon: DateRangeIcon,
      label: "DOB",
      value: "24-07-1989",
    },
    {
      icon: PermIdentityIcon,
      label: "IdType",
      value: "Credit Card",
    },
    {
      icon: InventoryIcon,
      label: "Product",
      value: "5661-9700-5467-2232",
    },
  ],
  scenario3: [
    {
      icon: BadgeIcon,
      label: "Name",
      value: "William Kane",
    },
    {
      icon: DateRangeIcon,
      label: "DOB",
      value: "09-09-1966",
    },
    {
      icon: PermIdentityIcon,
      label: "IdType",
      value: "Surname",
    },
    {
      icon: InventoryIcon,
      label: "Product",
      value: "77-11-44 54009718",
    },
  ],
  scenario4: [
    {
      icon: BadgeIcon,
      label: "Name",
      value: "Not Identified",
    },
  ],
  scenario5: [
    {
      icon: BadgeIcon,
      label: "Name",
      value: "Marcus Rashford",
    },
    {
      icon: DateRangeIcon,
      label: "DOB",
      value: "19-03-1989",
    },
    {
      icon: PermIdentityIcon,
      label: "IdType",
      value: "Phone + CLI",
    },
    {
      icon: InventoryIcon,
      label: "Product",
      value: "77001189765671",
    },
  ],
};

const ivrPaneldata = {
  scenario1: [
    {
      icon: AccessTimeIcon,
      label: "Time On Hold",
      value: "00:00:15",
    },
    {
      icon: AltRouteIcon,
      label: "Reason",
      value: "101 - Switch Current account",
    },
    {
      icon: RingVolumeIcon,
      label: "Call Info",
      value: "ID in IVR ",
    },
    {
      icon: SettingsVoiceIcon,
      label: "Utterance",
      value: "Switch Account",
    },
  ],
  scenario2: [
    {
      icon: AccessTimeIcon,
      label: "Time On Hold",
      value: "00:00:15",
    },
    {
      icon: AltRouteIcon,
      label: "Reason",
      value: "712 - Credit Limit Increase",
    },
    {
      icon: RingVolumeIcon,
      label: "Call Info",
      value: "ID in IVR ",
    },
    {
      icon: SettingsVoiceIcon,
      label: "Utterance",
      value: "Increase Limit",
    },
  ],
  scenario3: [
    {
      icon: AccessTimeIcon,
      label: "Time On Hold",
      value: "00:00:15",
    },
    {
      icon: AltRouteIcon,
      label: "Reason",
      value: "211 - Current Account",
    },
    {
      icon: RingVolumeIcon,
      label: "Call Info",
      value: "ID in IVR ",
    },
    {
      icon: SettingsVoiceIcon,
      label: "Utterance",
      value: "Balance enquiry",
    },
  ],
  scenario4: [
    {
      icon: AccessTimeIcon,
      label: "Time On Hold",
      value: "00:00:15",
    },
    {
      icon: AltRouteIcon,
      label: "Reason",
      value: "Unknown",
    },
    {
      icon: RingVolumeIcon,
      label: "Call Info",
      value: "Not Identified ",
    },
    {
      icon: SettingsVoiceIcon,
      label: "Utterance",
      value: "Unknown",
    },
  ],
  scenario5: [
    {
      icon: AccessTimeIcon,
      label: "Time On Hold",
      value: "00:00:15",
    },
    {
      icon: AltRouteIcon,
      label: "Reason",
      value: "361 - Payment Issue"
    },
    {
      icon: RingVolumeIcon,
      label: "Call Info",
      value: "ID in IVR ",
    },
    {
      icon: SettingsVoiceIcon,
      label: "Utterance",
      value: "Issue with Bill Payment",
    },
  ],
};

export { ivrPaneldata, idPaneldata, verificationPaneldata, productsPaneldata };
