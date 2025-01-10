import {
  useNavigate,
  isRouteErrorResponse,
  useRouteError,
 } from 'react-router-dom';
 import { Button } from "@/components/ui/button";
 import { Card } from "@/components/ui/card";
 import { XCircle } from "lucide-react";
 
 export const ErrorBoundary = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
 
  if (!isRouteErrorResponse(error)) {
    return null;
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <div className="p-8 flex flex-col items-center space-y-6">

          <div className="text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              ¡Ups! Algo salió mal
            </h1>
            <p className="text-muted-foreground text-lg">
              No pudimos cargar esta página
            </p>
          </div>
 
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
 
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Error {error.status}
            </p>
            <p className="text-base text-muted-foreground">
              {error.statusText}
            </p>
          </div>
 
          {/* Detalles del error para modo desarrollo */}
          {import.meta.env.MODE === 'development' && (
            <div className="w-full rounded-lg bg-muted/50 p-4">
              <div className="text-xs font-mono text-muted-foreground overflow-auto max-h-40">
                <pre>
                  {JSON.stringify(error, null, 2)}
                </pre>
              </div>
            </div>
          )}
 
          <Button 
            onClick={() => navigate(-1)}
            className="w-full text-white"
            size="lg"
          >
            Volver atrás
          </Button>
        </div>
      </Card>
    </div>
  );
 };