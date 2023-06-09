const CUSTOMWINDOWSPARAMETER = (armJson) => {

const W_PARAMETER = {
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "location": {
            "value": armJson.region
        },
        "networkInterfaceName": {
            "value": armJson.nicName
        },
        "networkSecurityGroupName": {
            "value": armJson.networkSecurityGroupName
        },
        "networkSecurityGroupRules": {
            "value": [
                {
                    "name": "RDP",
                    "properties": {
                        "priority": 300,
                        "protocol": "TCP",
                        "access": "Allow",
                        "direction": "Inbound",
                        "sourceAddressPrefix": "*",
                        "sourcePortRange": "*",
                        "destinationAddressPrefix": "*",
                        "destinationPortRange": "3389"
                    }
                }
            ]
        },
        "subnetName": {
            "value": armJson.subnet
        },
        "virtualNetworkName": {
            "value": armJson.virtualNetworkName
        },
        "addressPrefixes": {
            "value": [
                "10.0.0.0/16"
            ]
        },
        "subnets": {
            "value": [
                {
                    "name": armJson.subnet,
                    "properties": {
                        "addressPrefix": "10.0.0.0/24"
                    }
                }
            ]
        },
        "virtualMachineName": {
            "value": armJson.vmName
        },
        "virtualMachineComputerName": {
            "value": armJson.vmName
        },
        "virtualMachineRG": {
            "value": armJson.virtualMachineRG
        },
        "osDiskType": {
            "value": armJson.osDiskType
        },
        "osDiskDeleteOption": {
            "value": "Delete"
        },
        "virtualMachineSize": {
            "value": armJson.vmSize
        },
        "nicDeleteOption": {
            "value": "Delete"
        },
        "adminUsername": {
            "value": armJson.admin_Username
        },
        "adminPassword": {
            "value": armJson.admin_Password
        },
        "patchMode": {
            "value": "AutomaticByOS"
        },
        "enableHotpatching": {
            "value": false
        }
    }
}
return W_PARAMETER;
}
export default CUSTOMWINDOWSPARAMETER