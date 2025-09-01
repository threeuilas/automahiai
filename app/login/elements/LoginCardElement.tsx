import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface LoginCardElementProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  loading?: boolean;
  error?: string;
}

export const LoginCardElement: React.FC<LoginCardElementProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  loading = false,
  error,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Sign in to your account</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={() => {}}
        >
          Forgot password?
        </Button>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2">
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {}}
      >
        Sign up
      </Button>
    </CardFooter>
  </Card>
);
