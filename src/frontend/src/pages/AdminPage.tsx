import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetAllInquiries, useIsCallerAdmin } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  LogIn,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { type Inquiry, ServiceType } from "../backend.d";

const serviceLabels: Record<ServiceType, string> = {
  [ServiceType.aiAgent]: "AI Agent",
  [ServiceType.videoEditing]: "Video Editing",
  [ServiceType.videoThumbnail]: "Video Thumbnail",
  [ServiceType.adsProduction]: "Ads Production",
  [ServiceType.songVideoProduction]: "Song Video Production",
  [ServiceType.preWeddingPhotography]: "Pre-Wedding Photography",
};

const serviceBadgeColors: Record<ServiceType, string> = {
  [ServiceType.aiAgent]: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  [ServiceType.videoEditing]:
    "bg-purple-500/20 text-purple-300 border-purple-500/30",
  [ServiceType.videoThumbnail]:
    "bg-pink-500/20 text-pink-300 border-pink-500/30",
  [ServiceType.adsProduction]:
    "bg-orange-500/20 text-orange-300 border-orange-500/30",
  [ServiceType.songVideoProduction]:
    "bg-green-500/20 text-green-300 border-green-500/30",
  [ServiceType.preWeddingPhotography]:
    "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const LOADING_ROW_IDS = ["r1", "r2", "r3", "r4", "r5"];
const LOADING_COL_IDS = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

function LoadingRows() {
  return (
    <>
      {LOADING_ROW_IDS.map((rowId) => (
        <TableRow key={rowId} data-ocid="admin.loading_state">
          {LOADING_COL_IDS.map((colId) => (
            <TableCell key={colId}>
              <Skeleton className="h-4 w-full bg-muted/40" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const {
    data: inquiries,
    isLoading: inquiriesLoading,
    error,
  } = useGetAllInquiries();

  const isLoggedIn = !!identity;

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-mystical rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Login Required
            </h2>
            <p className="text-muted-foreground text-sm">
              Please log in with Internet Identity to access the admin
              dashboard.
            </p>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="bg-gold text-primary-foreground font-semibold w-full"
            data-ocid="nav.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/" })}
            className="text-muted-foreground hover:text-gold"
            data-ocid="nav.link"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  // Loading admin check
  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className="flex flex-col items-center gap-4"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-10 h-10 text-gold animate-spin" />
          <p className="text-muted-foreground text-sm">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-mystical rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6"
          data-ocid="admin.error_state"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground text-sm">
              You don't have admin permissions to view this page.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="border-border/60 hover:border-gold/60 hover:text-gold"
            data-ocid="nav.link"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/" })}
              className="text-muted-foreground hover:text-gold"
              data-ocid="nav.link"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="h-5 w-px bg-border/50" />
            <img
              src="/assets/generated/viranra-logo-transparent.dim_400x200.png"
              alt="Viranra Mystics"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gold/20 text-gold border-gold/30 text-xs">
              Admin Dashboard
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Inquiry <span className="shimmer-text">Management</span>
            </h1>
            <p className="text-muted-foreground">
              All client inquiries submitted through the website.
            </p>
          </div>

          {/* Stats */}
          {!inquiriesLoading && inquiries && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="card-mystical rounded-xl p-4">
                <p className="text-2xl font-display font-bold text-gold">
                  {inquiries.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Inquiries
                </p>
              </div>
              {Object.values(ServiceType)
                .slice(0, 3)
                .map((svc) => {
                  const count = inquiries.filter(
                    (i) => i.serviceType === svc,
                  ).length;
                  return (
                    <div key={svc} className="card-mystical rounded-xl p-4">
                      <p className="text-2xl font-display font-bold text-gold">
                        {count}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {serviceLabels[svc]}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="card-mystical rounded-xl p-6 flex items-center gap-3 border-destructive/40 mb-6"
              data-ocid="admin.error_state"
            >
              <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              <p className="text-sm text-destructive">
                Failed to load inquiries. Please try refreshing the page.
              </p>
            </div>
          )}

          {/* Table */}
          <div
            className="card-mystical rounded-2xl overflow-hidden"
            data-ocid="admin.table"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40 hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold w-16">
                      #
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Phone
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Service
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Message
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiriesLoading ? (
                    <LoadingRows />
                  ) : !inquiries || inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-16">
                        <div
                          className="flex flex-col items-center gap-3 text-muted-foreground"
                          data-ocid="admin.empty_state"
                        >
                          <AlertCircle className="w-8 h-8 opacity-40" />
                          <p className="text-sm">No inquiries yet.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    (inquiries as Inquiry[]).map((inquiry, index) => {
                      const rowOcid = "admin.row" as const;
                      return (
                        <TableRow
                          key={inquiry.id.toString()}
                          className="border-border/30 hover:bg-muted/20 transition-colors"
                          data-ocid={rowOcid}
                        >
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {inquiry.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {inquiry.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {inquiry.phone ?? "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full border ${serviceBadgeColors[inquiry.serviceType]}`}
                            >
                              {serviceLabels[inquiry.serviceType]}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-xs">
                            <span
                              className="block truncate"
                              title={inquiry.message}
                            >
                              {inquiry.message}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                            {formatDate(inquiry.timestamp)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
