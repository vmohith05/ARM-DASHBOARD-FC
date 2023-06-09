

  const customWinArmTemplate = (armJson) => {
    const winTempJson = {
      "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "metadata": {
        "_generator": {
          "name": "bicep",
          "version": "0.15.31.15270",
          "templateHash": "3941101056511835882"
        }
      },
      "parameters": {
        "adminUsername": {
          "type": "string",
          "metadata": {
            "description": "Username for the Virtual Machine."
          }
        },
        "adminPassword": {
          "type": "securestring",
          "minLength": 12,
          "metadata": {
            "description": "Password for the Virtual Machine."
          }
        },
        "dnsLabelPrefix": {
          "type": "string",
          "defaultValue": "[toLower(format('{0}-{1}', parameters('vmName'), uniqueString(resourceGroup().id, parameters('vmName'))))]",
          "metadata": {
            "description": "Unique DNS Name for the Public IP used to access the Virtual Machine."
          }
        },
        "publicIpName": {
          "type": "string",
          "defaultValue": "myPublicIP",
          "metadata": {
            "description": "Name for the Public IP used to access the Virtual Machine."
          }
        },
        "publicIPAllocationMethod": {
          "type": "string",
          "defaultValue": "Dynamic",
          "allowedValues": [
            "Dynamic",
            "Static"
          ],
          "metadata": {
            "description": "Allocation method for the Public IP used to access the Virtual Machine."
          }
        },
        "publicIpSku": {
          "type": "string",
          "defaultValue": "Basic",
          "allowedValues": [
            "Basic",
            "Standard"
          ],
          "metadata": {
            "description": "SKU for the Public IP used to access the Virtual Machine."
          }
        },
        "OSVersion": {
          "type": "string",
          "defaultValue": armJson.osDefaultVersion,
          "allowedValues": armJson.osVersion.label,
          "metadata": {
            "description": "The Windows version for the VM. This will pick a fully patched image of this given Windows version."
          }
        },
        "vmSize": {
          "type": "string",
          "defaultValue": "Standard_D2s_v5",
          "metadata": {
            "description": "Size of the virtual machine."
          }
        },
        "location": {
          "type": "string",
          "defaultValue": "[resourceGroup().location]",
          "metadata": {
            "description": "Location for all resources."
          }
        },
        "vmName": {
          "type": "string",
          "defaultValue": armJson.vmName,
          "metadata": {
            "description": "Name of the virtual machine."
          }
        },
        "securityType": {
          "type": "string",
          "defaultValue": "TrustedLaunch",
          "allowedValues": [
            "Standard",
            "TrustedLaunch"
          ],
          "metadata": {
            "description": "Security Type of the Virtual Machine."
          }
        }
      },
      "variables": {
        "storageAccountName": armJson.storageAccountName,
        "nicName": armJson.nicName,
        "addressPrefix": "10.0.0.0/16",
        "subnetName": "Subnet",
        "subnetPrefix": "10.0.0.0/24",
        "virtualNetworkName": armJson.virtualNetworkName,
        "networkSecurityGroupName": armJson.networkSecurityGroupName,
        "securityProfileJson": {
          "uefiSettings": {
            "secureBootEnabled": true,
            "vTpmEnabled": true
          },
          "securityType": "[parameters('securityType')]"
        },
        "extensionName": "GuestAttestation",
        "extensionPublisher": "Microsoft.Azure.Security.WindowsAttestation",
        "extensionVersion": "1.0",
        "maaTenantName": "GuestAttestation",
        "maaEndpoint": "[substring('emptyString', 0, 0)]"
      },
      "resources": [
        {
          "type": "Microsoft.Storage/storageAccounts",
          "apiVersion": "2022-05-01",
          "name": armJson.storageAccountName,
          "location": "[parameters('location')]",
          "sku": {
            "name": "Standard_LRS"
          },
          "kind": "Storage"
        },
        {
          "type": "Microsoft.Network/publicIPAddresses",
          "apiVersion": "2022-05-01",
          "name": "[parameters('publicIpName')]",
          "location": "[parameters('location')]",
          "sku": {
            "name": "[parameters('publicIpSku')]"
          },
          "properties": {
            "publicIPAllocationMethod": "[parameters('publicIPAllocationMethod')]",
            "dnsSettings": {
              "domainNameLabel": "[parameters('dnsLabelPrefix')]"
            }
          }
        },
        {
          "type": "Microsoft.Network/networkSecurityGroups",
          "apiVersion": "2022-05-01",
          "name": "[variables('networkSecurityGroupName')]",
          "location": "[parameters('location')]",
          "properties": {
            "securityRules": [
              {
                "name": "default-allow-3389",
                "properties": {
                  "priority": 1000,
                  "access": "Allow",
                  "direction": "Inbound",
                  "destinationPortRange": "3389",
                  "protocol": "Tcp",
                  "sourcePortRange": "*",
                  "sourceAddressPrefix": "*",
                  "destinationAddressPrefix": "*"
                }
              }
            ]
          }
        },
        {
          "type": "Microsoft.Network/virtualNetworks",
          "apiVersion": "2022-05-01",
          "name": "[variables('virtualNetworkName')]",
          "location": "[parameters('location')]",
          "properties": {
            "addressSpace": {
              "addressPrefixes": [
                "[variables('addressPrefix')]"
              ]
            },
            "subnets": [
              {
                "name": "[variables('subnetName')]",
                "properties": {
                  "addressPrefix": "[variables('subnetPrefix')]",
                  "networkSecurityGroup": {
                    "id": "[resourceId('Microsoft.Network/networkSecurityGroups', variables('networkSecurityGroupName'))]"
                  }
                }
              }
            ]
          },
          "dependsOn": [
            "[resourceId('Microsoft.Network/networkSecurityGroups', variables('networkSecurityGroupName'))]"
          ]
        },
        {
          "type": "Microsoft.Network/networkInterfaces",
          "apiVersion": "2022-05-01",
          "name": "[variables('nicName')]",
          "location": "[parameters('location')]",
          "properties": {
            "ipConfigurations": [
              {
                "name": "ipconfig1",
                "properties": {
                  "privateIPAllocationMethod": "Dynamic",
                  "publicIPAddress": {
                    "id": "[resourceId('Microsoft.Network/publicIPAddresses', parameters('publicIpName'))]"
                  },
                  "subnet": {
                    "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('virtualNetworkName'), variables('subnetName'))]"
                  }
                }
              }
            ]
          },
          "dependsOn": [
            "[resourceId('Microsoft.Network/publicIPAddresses', parameters('publicIpName'))]",
            "[resourceId('Microsoft.Network/virtualNetworks', variables('virtualNetworkName'))]"
          ]
        },
        {
          "type": "Microsoft.Compute/virtualMachines",
          "apiVersion": "2022-03-01",
          "name": "[parameters('vmName')]",
          "location": "[parameters('location')]",
          "properties": {
            "hardwareProfile": {
              "vmSize": "[parameters('vmSize')]"
            },
            "osProfile": {
              "computerName": "[parameters('vmName')]",
              "adminUsername": "[parameters('adminUsername')]",
              "adminPassword": "[parameters('adminPassword')]"
            },
            "storageProfile": {
              "imageReference": {
                "publisher": "MicrosoftWindowsServer",
                "offer": "WindowsServer",
                "sku": "[parameters('OSVersion')]",
                "version": "latest"
              },
              "osDisk": {
                "createOption": "FromImage",
                "managedDisk": {
                  "storageAccountType": "StandardSSD_LRS"
                }
              },
              "dataDisks": [
                {
                  "diskSizeGB": 1023,
                  "lun": 0,
                  "createOption": "Empty"
                }
              ]
            },
            "networkProfile": {
              "networkInterfaces": [
                {
                  "id": "[resourceId('Microsoft.Network/networkInterfaces', variables('nicName'))]"
                }
              ]
            },
            "diagnosticsProfile": {
              "bootDiagnostics": {
                "enabled": true,
                "storageUri": "[reference(resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName')), '2022-05-01').primaryEndpoints.blob]"
              }
            },
            "securityProfile": "[if(equals(parameters('securityType'), 'TrustedLaunch'), variables('securityProfileJson'), json('null'))]"
          },
          "dependsOn": [
            "[resourceId('Microsoft.Network/networkInterfaces', variables('nicName'))]",
            "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
          ]
        },
        {
          "condition": "[and(equals(parameters('securityType'), 'TrustedLaunch'), and(equals(variables('securityProfileJson').uefiSettings.secureBootEnabled, true()), equals(variables('securityProfileJson').uefiSettings.vTpmEnabled, true())))]",
          "type": "Microsoft.Compute/virtualMachines/extensions",
          "apiVersion": "2022-03-01",
          "name": "[format('{0}/{1}', parameters('vmName'), variables('extensionName'))]",
          "location": "[parameters('location')]",
          "properties": {
            "publisher": "[variables('extensionPublisher')]",
            "type": "[variables('extensionName')]",
            "typeHandlerVersion": "[variables('extensionVersion')]",
            "autoUpgradeMinorVersion": true,
            "settings": {
              "AttestationConfig": {
                "MaaSettings": {
                  "maaEndpoint": "[variables('maaEndpoint')]",
                  "maaTenantName": "[variables('maaTenantName')]"
                }
              }
            }
          },
          "dependsOn": [
            "[resourceId('Microsoft.Compute/virtualMachines', parameters('vmName'))]"
          ]
        }
      ],
      "outputs": {
        "hostname": {
          "type": "string",
          "value": armJson.vmName
        }
      }
    }

    return winTempJson;

  }

  export default customWinArmTemplate;