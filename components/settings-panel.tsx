'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingStore } from '@/store/typing-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, X, Volume2, Type, Keyboard, Palette } from 'lucide-react';

export function SettingsPanel() {
  const { settings, updateSettings } = useTypingStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40"
      >
        <Settings className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Settings
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      <Label className="text-base font-medium">Appearance</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select
                          value={settings.theme}
                          onValueChange={(value) => handleSettingChange('theme', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Font Size: {settings.fontSize}px</Label>
                        <Slider
                          value={[settings.fontSize]}
                          onValueChange={(value) => handleSettingChange('fontSize', value[0])}
                          min={16}
                          max={36}
                          step={2}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4" />
                      <Label className="text-base font-medium">Keyboard</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Layout</Label>
                        <Select
                          value={settings.keyboardLayout}
                          onValueChange={(value) => handleSettingChange('keyboardLayout', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="qwerty">QWERTY</SelectItem>
                            <SelectItem value="dvorak">Dvorak</SelectItem>
                            <SelectItem value="colemak">Colemak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-keyboard">Show Keyboard</Label>
                        <Switch
                          id="show-keyboard"
                          checked={settings.showKeyboard}
                          onCheckedChange={(checked) => handleSettingChange('showKeyboard', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <Label className="text-base font-medium">Sound</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-enabled">Key Sounds</Label>
                        <Switch
                          id="sound-enabled"
                          checked={settings.soundEnabled}
                          onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Volume: {Math.round(settings.soundVolume * 100)}%</Label>
                        <Slider
                          value={[settings.soundVolume]}
                          onValueChange={(value) => handleSettingChange('soundVolume', value[0])}
                          min={0}
                          max={1}
                          step={0.1}
                          className="w-full"
                          disabled={!settings.soundEnabled}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      <Label className="text-base font-medium">Advanced</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smooth-caret">Smooth Caret Animation</Label>
                      <Switch
                        id="smooth-caret"
                        checked={settings.smoothCaret}
                        onCheckedChange={(checked) => handleSettingChange('smoothCaret', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}